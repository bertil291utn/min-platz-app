import React, { useRef } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton
} from '@ionic/react';
import { clipboardOutline, eyeOutline, closeOutline } from 'ionicons/icons';
import MonitoreoC from '../components/MonitoreoC';
import ViewMonitoredC from '../components/ViewMonitoredC';
import { MonitoringBloqueProvider } from '../contexts/MonitoringBloqueContext';

const TabMonitoreo: React.FC = () => {
  const monitoreoModalRef = useRef<HTMLIonModalElement>(null);
  const viewMonitoreoModalRef = useRef<HTMLIonModalElement>(null);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="6" sizeSm="12">
              <IonCard button id="open-monitoreo-modal">
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
              <IonCard button id="open-view-monitoreo-modal">
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

        {/* Monitoreo Modal */}
        <IonModal 
          ref={monitoreoModalRef}
          trigger="open-monitoreo-modal"
          initialBreakpoint={1}
          breakpoints={[0, 1]}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => monitoreoModalRef.current?.dismiss()}>
                  salir
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <MonitoreoC />
          </IonContent>
        </IonModal>

        {/* View Monitoreo Modal */}
        <IonModal 
          ref={viewMonitoreoModalRef}
          trigger="open-view-monitoreo-modal"
          initialBreakpoint={1}
          breakpoints={[0, 1]}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => viewMonitoreoModalRef.current?.dismiss()}>
                  salir
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <MonitoringBloqueProvider>
              <ViewMonitoredC />
            </MonitoringBloqueProvider>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default TabMonitoreo;
