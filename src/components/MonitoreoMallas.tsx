import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonLabel, IonTextarea, IonSelect, IonSelectOption,
  IonChip, IonItem, IonList, IonIcon, IonSpinner, IonToast, IonAlert
} from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setActiveSegment,
  setSelectedVariety,
  setSelectedDiseases,
  updateDiseaseStatus,
  updateDiseaseCount,
  setObservations,
  resetForm,
  updateMallaMonitoring,
  setIsEdit
} from '../store/slices/mallasMonitoringSlice';
import { Disease } from '../interfaces/Diseases';
import { addCircle, removeCircle, arrowBack } from 'ionicons/icons';
import SegmentMonitoreoDiseases from './SegmentMonitoreoDiseases';
import { ROSE_VARIETIES } from '../interfaces/RoseVariety';
import { CURRENT_WEEK_NUMBER } from '../helpers/regularHelper';
import { useState, useEffect } from 'react';

const MonitoreoMallas = () => {
  const dispatch = useAppDispatch();
  
  // Get selectedBloque and selectedWeek from monitoringBloque state
  const { selectedBloque, selectedWeek } = useAppSelector(state => state.monitoringBloque);
  
  const {
    activeSegment,
    selectedVariety,
    selectedDiseases,
    observations,
    loading,
    isToastSavedOpen,
    mallasMonitored,
    isEdit
  } = useAppSelector(state => state.mallasMonitoring);

  const [displayAlert, setDisplayAlert] = useState<boolean>(false);

  const handleSave = () => {
    if (!selectedBloque?.id || !selectedVariety || selectedDiseases.length === 0) return;

    dispatch(updateMallaMonitoring({
      bloqueId: selectedBloque.id,
      variety: selectedVariety,
      diseases: selectedDiseases,
      observations,
    }));

    dispatch(resetForm());
    dispatch(setIsEdit(false));
    dispatch(setActiveSegment('variety'));
  };

  // Check if this is an edit case when variety is selected
  useEffect(() => {
    if (selectedVariety && selectedBloque?.id) {
      const weekNumber = selectedWeek || CURRENT_WEEK_NUMBER;
      const bloqueIndex = mallasMonitored?.findIndex(b => 
        b.id === selectedBloque.id && b.weekNumber === weekNumber
      );
      
      if (bloqueIndex !== -1) {
        const mallaExists = mallasMonitored[bloqueIndex].mallas.some(
          m => m.variety === selectedVariety
        );
        if (mallaExists) {
          setDisplayAlert(true);
          dispatch(setIsEdit(true));
        } else {
          dispatch(setIsEdit(false));
        }
      } else {
        dispatch(setIsEdit(false));
      }
    }
  }, [selectedVariety, selectedBloque?.id, selectedWeek, mallasMonitored, dispatch]);

  const handleSelectVariety = (variety: string) => {
    dispatch(setSelectedVariety(variety));
    dispatch(setActiveSegment('diseases'));
  };

  const handleUpdateDiseaseStatus = (diseaseId: number, status: 'vivo' | 'muerto') => {
    dispatch(updateDiseaseStatus({ diseaseId, status }));
  };

  const handleUpdateDiseaseCount = (diseaseId: number, count: number) => {
    dispatch(updateDiseaseCount({ diseaseId, count }));
  };

  // Al iniciar, establecer activeSegment a 'variety' si no hay uno definido
  useEffect(() => {
    if (!activeSegment || activeSegment === 'bloques') {
      dispatch(setActiveSegment('variety'));
    }
  }, []);

  const renderDiseasesList = () => (
    <IonList>
      {selectedDiseases.map(disease => (
        <IonItem key={disease.id}>
          <IonLabel>{disease.name}</IonLabel>
          <div slot="end" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IonSelect
              value={disease.status}
              interface="popover"
              onIonChange={e => handleUpdateDiseaseStatus(disease.id, e.detail.value)}
            >
              <IonSelectOption value="vivo">Vivo</IonSelectOption>
              <IonSelectOption value="muerto">Muerto</IonSelectOption>
            </IonSelect>

            <IonButton onClick={() =>
              handleUpdateDiseaseCount(disease.id, Math.max(1, disease.count - 1))
            }>
              <IonIcon icon={removeCircle} />
            </IonButton>
            <IonLabel>{disease.count}</IonLabel>
            <IonButton onClick={() =>
              handleUpdateDiseaseCount(disease.id, disease.count + 1)
            }>
              <IonIcon icon={addCircle} />
            </IonButton>
          </div>
        </IonItem>
      ))}
    </IonList>
  );

  const renderContent = () => {
    switch (activeSegment) {
      case 'variety':
        return (
          <div className="ion-padding">
            <div style={{ margin: '1.5rem 0' }}>
              <IonLabel>Seleccione la variedad</IonLabel>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {ROSE_VARIETIES.map(variety => (
                <IonCard
                  key={variety.id}
                  onClick={() => handleSelectVariety(variety.id)}
                  color={selectedVariety === variety.id ? 'primary' : ''}
                  button
                >
                  <IonCardHeader>
                    <IonCardTitle>{variety.name}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              ))}
            </div>

            <IonAlert
              isOpen={displayAlert}
              onDidDismiss={() => setDisplayAlert(false)}
              header="Variedad ya monitoreada"
              message="Esta variedad ya ha sido monitoreada en esta semana. ¿Desea continuar?"
              buttons={[
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: () => {
                    dispatch(setActiveSegment('variety'));
                  }
                },
                {
                  text: 'Continuar',
                  handler: () => {
                    setDisplayAlert(false);
                    dispatch(setActiveSegment('diseases'));
                  }
                }
              ]}
            />
          </div>
        );
      case 'diseases':
        return (
          <div className="ion-padding">
            <SegmentMonitoreoDiseases
              mode="mallas"
            />
          </div>
        );
      case 'details':
        return (
          <div className="ion-padding">
            <ReturnButtonMallas segmentReturn="diseases" />
            <div style={{ margin: '1.5rem 0' }}>
              <IonLabel>Detalle de plagas encontradas</IonLabel>
            </div>

            {renderDiseasesList()}

            <div style={{ margin: '2rem 0' }}>
              <IonTextarea
                label="Observaciones adicionales"
                labelPlacement="floating"
                fill="outline"
                value={observations}
                onIonInput={e => dispatch(setObservations(e.detail.value!))}
                rows={4}
              />
            </div>

            <IonButton expand="block" onClick={handleSave} disabled={loading}>
              {loading ? <IonSpinner /> : 'Guardar'}
            </IonButton>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {selectedBloque && (
        <IonCard>
          <IonCardContent>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <IonChip color="secondary">
                <IonLabel>{`Semana ${selectedWeek || CURRENT_WEEK_NUMBER}`}</IonLabel>
              </IonChip>
              <IonChip color="secondary">
                <IonLabel>{selectedBloque.name}</IonLabel>
              </IonChip>
              {selectedVariety && (
                <IonChip color="secondary" onClick={() => {
                  dispatch(setActiveSegment('variety'));
                  dispatch(setSelectedDiseases([]));
                  dispatch(setObservations(''));
                }}>
                  <IonLabel>{ROSE_VARIETIES.find(v => v.id === selectedVariety)?.name || selectedVariety}</IonLabel>
                </IonChip>
              )}
              {selectedDiseases.length > 0 && (
                <IonChip color="secondary" onClick={() => dispatch(setActiveSegment('diseases'))}>
                  <IonLabel>Diseases</IonLabel>
                </IonChip>
              )}
            </div>
          </IonCardContent>
        </IonCard>
      )}

      {renderContent()}

      <IonToast
        isOpen={isToastSavedOpen}
        message="Monitoreo guardado exitosamente"
        duration={2000}
      />
    </>
  );
};

export default MonitoreoMallas;

export interface ReturnButtonMallasProps {
  segmentReturn: string;
}

export const ReturnButtonMallas: React.FC<ReturnButtonMallasProps> = ({ segmentReturn }) => {
  const dispatch = useAppDispatch();
  return (
    <IonButton fill="clear" onClick={() => dispatch(setActiveSegment(segmentReturn as any))}>
      <IonIcon slot="start" icon={arrowBack}></IonIcon>
      regresar
    </IonButton>
  );
};