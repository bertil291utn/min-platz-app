import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonInput, IonTextarea } from '@ionic/react';
import { useState } from 'react';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import ReturnButtonC from './ReturnButtonC';
import './Monitoring.css';

const MonitoreoPlacas = () => {
  const { selectedBloque, setActiveSegment } = useMonitoringBloque();
  const [observations, setObservations] = useState('');

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving placas monitoring data:', observations);
    setActiveSegment('monitoring-options');
  };

  return (
    <div className="ion-padding">
      <ReturnButtonC segmentReturn="monitoring-options" />
      
      <h2 className="ion-text-center">Monitoreo de Placas - {selectedBloque?.name}</h2>
      
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Observaciones de Placas</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonTextarea
                  label="Observaciones"
                  labelPlacement="floating"
                  placeholder="Ingrese sus observaciones sobre las placas..."
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

export default MonitoreoPlacas; 