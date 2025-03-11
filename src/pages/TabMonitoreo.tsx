import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonGrid,
  IonIcon,
  IonButton
} from '@ionic/react';
import { clipboardOutline, eyeOutline, arrowBackOutline } from 'ionicons/icons';
import MonitoreoC from '../components/MonitoreoC';
import ViewMonitoredC from '../components/ViewMonitoredC';
import { MonitoringBloqueProvider } from '../contexts/MonitoringBloqueContext';

const TabMonitoreo: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'monitorear' | 'ver' | null>(null);

  const handleBack = () => {
    setSelectedOption(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {selectedOption ? (
            <>
              <IonButton slot="start" fill="clear" onClick={handleBack}>
                <IonIcon icon={arrowBackOutline} />
              </IonButton>
              <IonTitle>
                {selectedOption === 'monitorear' ? 'Monitorear' : 'Ver Monitoreo'}
              </IonTitle>
            </>
          ) : (
            <IonTitle>Monitoreo</IonTitle>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {selectedOption === null && (
          <IonGrid>
            <IonRow>
              <IonCol sizeMd="6" sizeSm="12">
                <IonCard button onClick={() => setSelectedOption('monitorear')}>
                  <IonCardHeader>
                    <IonIcon icon={clipboardOutline} size="large" color="primary" />
                    <IonCardTitle>Monitorear</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Iniciar nuevo monitoreo de bloques, camas y enfermedades
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol sizeMd="6" sizeSm="12">
                <IonCard button onClick={() => setSelectedOption('ver')}>
                  <IonCardHeader>
                    <IonIcon icon={eyeOutline} size="large" color="secondary" />
                    <IonCardTitle>Ver Monitoreo</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Ver historial de monitoreos realizados anteriormente
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
        
        {selectedOption === 'monitorear' && <MonitoreoC />}
        {selectedOption === 'ver' && (
          <MonitoringBloqueProvider>
            <ViewMonitoredC />
          </MonitoringBloqueProvider>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TabMonitoreo;
