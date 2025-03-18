import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import MonitoringOptionsScreen from '../components/MonitoringOptionsScreen';
import MonitoreoC from '../components/MonitoreoC';
import ViewMonitoredC from '../components/ViewMonitoredC';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonAccordionGroup,
  IonAccordion,
  IonItem
} from '@ionic/react';
import { clipboardOutline, eyeOutline } from 'ionicons/icons';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectActiveBloques } from '../store/slices/bloqueInfoSlice';
import { Bloque } from '../interfaces/Bloque';
import {
  setActiveSegment as setMonitoringSegment,
  setSelectedBloque as setMonitoringBloque
} from '../store/slices/monitoringBloqueSlice';

type modal = 'monitorear' | 'view';
type SegmentType = 'monitorear' | 'historial';

const TabMonitoreo: React.FC = () => {
  const [IsOpenModal, setIsOpenModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<modal>();
  const [activeSegment, setActiveSegment] = useState<SegmentType>('monitorear');

  const dispatch = useAppDispatch();
  const activeBloques = useAppSelector(selectActiveBloques);

  const handleModal = (kind: modal) => () => {
    setCurrentModal(kind);
    setIsOpenModal(true);
  };

  const handleSegmentChange = (value: any) => {
    const segmentValue = value?.toString();
    if (segmentValue === 'monitorear' || segmentValue === 'historial') {
      setActiveSegment(segmentValue);
    }
  };

  const handleOptionSelect = (option: 'camas' | 'placas' | 'mallas', bloqueId: number) => {
    const selectedBloque = activeBloques.find(b => b.id === bloqueId);
    if (selectedBloque) {
      dispatch(setMonitoringBloque(selectedBloque));
      if (option === 'camas') {
        dispatch(setMonitoringSegment('camas'));
        handleModal('monitorear')();
      }
      handleModal('monitorear')();
    }
  };

  const IsThereActiveBloques = activeBloques.length > 0;

  return (
    <IonPage>
      <IonContent fullscreen>
        {IsThereActiveBloques ? (
          <>
            <IonSegment value={activeSegment} onIonChange={e => handleSegmentChange(e.detail.value)}>
              <IonSegmentButton value="monitorear">
                <IonLabel>Monitorear</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="historial">
                <IonLabel>Ver Monitoreo</IonLabel>
              </IonSegmentButton>
            </IonSegment>


            <div className="ion-padding">
              {activeSegment === 'monitorear' && (
                <IonAccordionGroup>
                  {activeBloques.map((bloque) => (
                    <IonAccordion
                      key={bloque.id?.toString()}
                      value={bloque.id?.toString()}
                    >
                      <IonItem slot="header">
                        <IonLabel>{bloque.name}</IonLabel>
                      </IonItem>
                      <div slot="content" className="ion-padding">
                        <MonitoringOptionsScreen
                          showReturnButton={false}
                          onOptionSelect={(option) => bloque.id && handleOptionSelect(option, bloque.id)}
                        />
                      </div>
                    </IonAccordion>
                  ))}

                </IonAccordionGroup>
              )}

              {activeSegment === 'historial' && (
                <IonCard onClick={handleModal('view')}>
                  <IonCardHeader>
                    <IonIcon icon={eyeOutline} size="large" color="secondary" />
                    <IonCardTitle>Ver Monitoreo</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Ver historial de monitoreos realizados anteriormente
                  </IonCardContent>
                </IonCard>
              )}
            </div>
          </>
        ) : (
          <div className="ion-padding">
            <p>No hay bloques activos</p>
            <IonButton routerLink="/tabs/settings">Añadir bloques</IonButton>
          </div>
        )}

        <LocalModal
          setIsOpenModal={setIsOpenModal}
          IsOpenModal={IsOpenModal}
        >
          <>
            {currentModal === 'view' && <ViewMonitoredC />}
            {currentModal === 'monitorear' && <MonitoreoC />}
          </>
        </LocalModal>
      </IonContent>
    </IonPage>
  );
};

const LocalModal: React.FC<{
  IsOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}> = ({ IsOpenModal, setIsOpenModal, children }) => {
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
  );
};

export default TabMonitoreo;
