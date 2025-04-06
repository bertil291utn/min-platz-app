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
  setIsEdit,
  fetchMallasMonitored
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
  const [initialCheckDone, setInitialCheckDone] = useState<boolean>(false);

  // Check if this is an edit case when variety is selected
  useEffect(() => {
    if (selectedVariety && selectedBloque?.id && !initialCheckDone) {
      setInitialCheckDone(true);
      const weekNumber = selectedWeek || CURRENT_WEEK_NUMBER;
      
      const bloqueIndex = mallasMonitored.findIndex(b => 
        b.id === selectedBloque.id && b.weekNumber === weekNumber
      );
      
      if (bloqueIndex !== -1) {
        const existingMalla = mallasMonitored[bloqueIndex].mallas.find(
          m => m.variety === selectedVariety
        );
        
        if (existingMalla) {
          setDisplayAlert(true);
          dispatch(setIsEdit(true));
          
          // Pre-load existing data for editing
          if (existingMalla.diseases.length > 0) {
            dispatch(setSelectedDiseases(existingMalla.diseases));
            dispatch(setObservations(existingMalla.observations || ''));
          }
        } else {
          dispatch(setIsEdit(false));
          dispatch(setActiveSegment('diseases'));
        }
      } else {
        dispatch(setIsEdit(false));
        dispatch(setActiveSegment('diseases'));
      }
    }
  }, [selectedVariety, selectedBloque?.id, selectedWeek, dispatch, initialCheckDone]);

  const handleSelectVariety = (variety: string) => {
    setInitialCheckDone(false);  // Reset the check flag when selecting a new variety
    dispatch(setSelectedVariety(variety));
  };

  const handleSave = async () => {
    if (!selectedBloque?.id || !selectedVariety) return;

    try {
      await dispatch(updateMallaMonitoring({
        bloqueId: selectedBloque.id,
        variety: selectedVariety,
        diseases: selectedDiseases,
        observations,
      })).unwrap();

      await dispatch(fetchMallasMonitored()).unwrap();

      dispatch(resetForm());
      dispatch(setIsEdit(false));
      dispatch(setActiveSegment('variety'));
    } catch (error) {
      console.error('Error saving malla:', error);
    }
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
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '1rem',
      padding: '1rem 0'
    }}>
      {selectedDiseases.map(disease => (
        <IonCard key={disease.id} style={{ display: 'flex', flexDirection: 'column' }}>
          <IonCardHeader>
            <IonCardTitle>{disease.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.5rem', 
              marginBottom: '1rem' 
            }}>
              <IonButton 
                expand="block" 
                fill={disease.status === 'vivo' ? 'solid' : 'outline'} 
                color="primary" 
                onClick={() => handleUpdateDiseaseStatus(disease.id, 'vivo')}
              >
                Vivo
              </IonButton>
              <IonButton 
                expand="block" 
                fill={disease.status === 'muerto' ? 'solid' : 'outline'} 
                color="primary" 
                onClick={() => handleUpdateDiseaseStatus(disease.id, 'muerto')}
              >
                Muerto
              </IonButton>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IonLabel>Cantidad:</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <IonButton 
                  fill="clear" 
                  onClick={() => handleUpdateDiseaseCount(disease.id, Math.max(1, disease.count - 1))}
                >
                  <IonIcon icon={removeCircle} />
                </IonButton>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  margin: '0 0.5rem', 
                  minWidth: '2rem', 
                  textAlign: 'center' 
                }}>
                  {disease.count}
                </div>
                <IonButton 
                  fill="clear" 
                  onClick={() => handleUpdateDiseaseCount(disease.id, disease.count + 1)}
                >
                  <IonIcon icon={addCircle} />
                </IonButton>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      ))}
    </div>
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
                    dispatch(setSelectedVariety(null));
                    dispatch(setSelectedDiseases([]));
                    dispatch(setObservations(''));
                    dispatch(setIsEdit(false));
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