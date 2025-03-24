import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonLabel, IonTextarea, IonSelect, IonSelectOption,
  IonChip, IonItem, IonList, IonIcon, IonSpinner, IonToast
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
  updateMallaMonitoring
} from '../store/slices/mallasMonitoringSlice';
import { Disease } from '../interfaces/Diseases';
import { addCircle, removeCircle } from 'ionicons/icons';
import SegmentMonitoreoBloques from './SegmentMonitoreoBloques';
import SegmentMonitoreoDiseases from './SegmentMonitoreoDiseases';
import { ROSE_VARIETIES } from '../interfaces/RoseVariety';

const MonitoreoMallas = () => {
  const dispatch = useAppDispatch();
  const {
    activeSegment,
    selectedVariety,
    selectedDiseases,
    observations,
    loading,
    isToastSavedOpen
  } = useAppSelector(state => state.mallasMonitoring);
  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);

  const handleDiseaseSelect = (disease: Disease) => {
    // dispatch(setSelectedDiseases([
    //   ...selectedDiseases,
    //   { ...disease, status: 'vivo', count: 0 }
    // ]));
    // dispatch(setActiveSegment('details'));
  };

  const handleSave = () => {
    if (!selectedBloque?.id || !selectedVariety || selectedDiseases.length === 0) return;

    dispatch(updateMallaMonitoring({
      bloqueId: selectedBloque.id,
      variety: selectedVariety,
      diseases: selectedDiseases,
      observations
    }));

    dispatch(resetForm());
    dispatch(setActiveSegment('diseases'));
  };

  const renderContent = () => {
    switch (activeSegment) {
      case 'bloques':
        return <SegmentMonitoreoBloques />;

      case 'variety':
        return (
          <div className="ion-padding">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Seleccione Variedad</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonSelect
                  label="Variedad"
                  labelPlacement="floating"
                  fill="outline"
                  value={selectedVariety}
                  onIonChange={e => {
                    dispatch(setSelectedVariety(e.detail.value));
                    dispatch(setActiveSegment('diseases'));
                  }}
                >
                  {ROSE_VARIETIES.map(variety => (
                    <IonSelectOption key={variety.id} value={variety.id}>
                      {variety.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCardContent>
            </IonCard>
          </div>
        );

      case 'diseases':
        return (
          <SegmentMonitoreoDiseases
            onDiseaseSelect={handleDiseaseSelect}
            mode="mallas"
          />
        );

      case 'details':
        return (
          <div className="ion-padding">
            <IonList>
              {selectedDiseases.map(disease => (
                <IonCard key={disease.id}>
                  <IonCardHeader>
                    <IonCardTitle>{disease.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonButton
                      fill={disease.status === 'vivo' ? 'solid' : 'outline'}
                      onClick={() => dispatch(updateDiseaseStatus({
                        diseaseId: disease.id,
                        status: 'vivo'
                      }))}
                    >
                      Vivo
                    </IonButton>
                    <IonButton
                      fill={disease.status === 'muerto' ? 'solid' : 'outline'}
                      onClick={() => dispatch(updateDiseaseStatus({
                        diseaseId: disease.id,
                        status: 'muerto'
                      }))}
                    >
                      Muerto
                    </IonButton>

                    <div slot="end" style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin:'1.5rem 0' }}>
                      <IonButton onClick={() => dispatch(updateDiseaseCount({
                        diseaseId: disease.id,
                        count: Math.max(0, disease.count - 1)
                      }))}>
                        <IonIcon icon={removeCircle} />
                      </IonButton>
                      <IonLabel>{disease.count}</IonLabel>
                      <IonButton onClick={() => dispatch(updateDiseaseCount({
                        diseaseId: disease.id,
                        count: disease.count + 1
                      }))}>
                        <IonIcon icon={addCircle} />
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}

              <div style={{ margin: '2rem 0' }}>
                <IonTextarea
                  label="Observaciones"
                  labelPlacement="floating"
                  fill="outline"
                  value={observations}
                  onIonInput={e => dispatch(setObservations(e.detail.value!))}
                  rows={4}
                />
              </div>

              <IonButton
                expand="block"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? <IonSpinner /> : 'Guardar'}
              </IonButton>
            </IonList>
          </div>
        );
    }
  };

  return (
    <>
      {selectedBloque && (
        <IonCard>
          <IonCardContent>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <IonChip
                color="secondary"
                onClick={() => dispatch(setActiveSegment('bloques'))}
              >
                <IonLabel>{selectedBloque.name}</IonLabel>
              </IonChip>

              {selectedVariety && (
                <IonChip
                  color="secondary"
                  onClick={() => dispatch(setActiveSegment('variety'))}
                >
                  <IonLabel>
                    {ROSE_VARIETIES.find(v => v.id === selectedVariety)?.name}
                  </IonLabel>
                </IonChip>
              )}

              {selectedDiseases.length > 0 && (
                <IonChip
                  color="secondary"
                  onClick={() => dispatch(setActiveSegment('diseases'))}
                >
                  <IonLabel>Enfermedades</IonLabel>
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