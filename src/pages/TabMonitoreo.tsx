import React, { Dispatch, ReactNode, SetStateAction, useRef, useState } from 'react';
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

type modal = 'monitorear' | 'view'

const TabMonitoreo: React.FC = () => {
  const [IsOpenModal, setIsOpenModal] = useState(false)
  const [currentModal, setCurrentModal] = useState<modal>();

  const handleModal = (kind: modal) => () => {
    setCurrentModal(kind);
    setIsOpenModal(true);
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard onClick={handleModal('monitorear')}>
          <IonCardHeader>
            <IonIcon icon={clipboardOutline} size="large" color="primary" />
            <IonCardTitle>Monitorear</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Iniciar nuevo monitoreo de bloques, camas y enfermedades
          </IonCardContent>
        </IonCard>
        <IonCard onClick={handleModal('view')}>
          <IonCardHeader>
            <IonIcon icon={eyeOutline} size="large" color="secondary" />
            <IonCardTitle>Ver Monitoreo</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Ver historial de monitoreos realizados anteriormente
          </IonCardContent>
        </IonCard>

        <LocalModal
          setIsOpenModal={setIsOpenModal}
          IsOpenModal={IsOpenModal}
        >
          <>
            {currentModal == 'view' &&
              <MonitoringBloqueProvider>
                <ViewMonitoredC />
              </MonitoringBloqueProvider>}

            {currentModal == 'monitorear' && <MonitoreoC />}
          </>

        </LocalModal>

      </IonContent>
    </IonPage>
  );
};

export default TabMonitoreo;


const LocalModal = ({
  IsOpenModal,
  setIsOpenModal,
  children
}: {
  IsOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}
) => {
  return (
    <IonModal
      isOpen={IsOpenModal}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpenModal(false)}>
              salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {children}
      </IonContent>
    </IonModal>
  )
}