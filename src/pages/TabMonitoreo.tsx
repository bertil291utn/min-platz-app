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
import { useBloqueInfo } from '../contexts/BloqueInfoContext';

type modal = 'monitorear' | 'view'

const TabMonitoreo: React.FC = () => {
  const [IsOpenModal, setIsOpenModal] = useState(false)
  const [currentModal, setCurrentModal] = useState<modal>();

  const { activeBloques } = useBloqueInfo();

  const handleModal = (kind: modal) => () => {
    setCurrentModal(kind);
    setIsOpenModal(true);
  }

  const IsThereActiveBloques = activeBloques.length > 0;

  return (
    <IonPage>
      <IonContent fullscreen>
        {IsThereActiveBloques ?
          <>
            <IonCard onClick={handleModal('monitorear')}>
              <IonCardHeader>
                <IonIcon icon={clipboardOutline} size="large" color="secondary" />
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
          </>
          :
          <div className='ion-padding'>
            <p>No hay bloques activos</p>
            <IonButton routerLink='/tabs/settings'>
              Añadir bloques
            </IonButton>
          </div>}

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
      onDidDismiss={() => setIsOpenModal(false)}
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