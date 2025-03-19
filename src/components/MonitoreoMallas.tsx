import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption } from '@ionic/react';
import { useState } from 'react';
import ReturnButtonC from './ReturnButtonC';
import './Monitoring.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveSegment } from '../store/slices/monitoringBloqueSlice';

const MonitoreoMallas = () => {
  const [observations, setObservations] = useState('');
  const [meshStatus, setMeshStatus] = useState('');
  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque)
  const dispatch = useAppDispatch();


  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving mallas monitoring data:', { observations, meshStatus });
    // dispatch(setActiveSegment('monitoring-options'));
  };

  return (
    <div className="ion-padding">


      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Estado de Mallas</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonSelect
                  label="Estado de las Mallas"
                  labelPlacement="floating"
                  placeholder="Seleccione el estado"
                  value={meshStatus}
                  onIonChange={e => setMeshStatus(e.detail.value)}
                >
                  <IonSelectOption value="bueno">Bueno</IonSelectOption>
                  <IonSelectOption value="regular">Regular</IonSelectOption>
                  <IonSelectOption value="malo">Malo</IonSelectOption>
                </IonSelect>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="12">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Observaciones</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonTextarea
                  label="Observaciones"
                  labelPlacement="floating"
                  placeholder="Ingrese sus observaciones sobre las mallas..."
                  value={observations}
                  onIonChange={e => setObservations(e.detail.value!)}
                  autoGrow={true}
                  rows={6}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="12">
            <IonButton expand="block" onClick={handleSave}>
              Guardar Monitoreo
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default MonitoreoMallas; 