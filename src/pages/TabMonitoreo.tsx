import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
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
  IonItem,
  IonTitle
} from '@ionic/react';
import { clipboardOutline, eyeOutline } from 'ionicons/icons';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectActiveBloques } from '../store/slices/bloqueInfoSlice';
import { Bloque } from '../interfaces/Bloque';
import {
  setActiveSegment as setMonitoringSegment,
  setSelectedBloque as setMonitoringBloque,
  setSelectedWeek
} from '../store/slices/monitoringBloqueSlice';
import MonitoreoPlacas from '../components/MonitoreoPlacas';
import MonitoreoMallas from '../components/MonitoreoMallas';
import { MonitoringModal } from '../interfaces/Monitoring';
import { CURRENT_DATE_UTC5, getWeekNumber } from '../helpers/regularHelper';
import ViewMonitoredPlacas from '../components/ViewMonitoredPlacas';
import ViewMonitoredMallas from '../components/ViewMonitoredMallas';


type SegmentType = 'monitorear' | 'historial';

const TabMonitoreo: React.FC = () => {
  const [IsOpenModal, setIsOpenModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<MonitoringModal>();
  const [activeSegment, setActiveSegment] = useState<SegmentType>('monitorear');
  const [headerText, setHeaderText] = useState('');

  const dispatch = useAppDispatch();
  const activeBloques = useAppSelector(selectActiveBloques);

  const handleModal = (kind: MonitoringModal) => () => {
    setCurrentModal(kind);
    setIsOpenModal(true);
  };

  const handleSegmentChange = (value: any) => {
    const segmentValue = value?.toString();
    if (segmentValue === 'monitorear' || segmentValue === 'historial') {
      setActiveSegment(segmentValue);
    }
  };

  const handleOptionSelect = (option: MonitoringModal
  ) => {
    if (option === 'monitorear-camas') {
      dispatch(setMonitoringSegment('bloques'));
    }
    handleModal(option)();
  };

  const IsThereActiveBloques = activeBloques.length > 0;

  useEffect(() => {
    dispatch(setSelectedWeek(undefined));
  }, [IsOpenModal])


  useEffect(() => {
    switch (currentModal) {
      case 'view-camas':
        setHeaderText('Ver Monitoreo por Camas');
        break;
      case 'view-placas':
        setHeaderText('Ver Monitoreo por placas');
        break;
      case 'monitorear-camas':
        setHeaderText('Monitoreo de Camas');
        break;
      case 'monitorear-placas':
        setHeaderText('Monitoreo de Placas');
        break;
      case 'monitorear-mallas':
        setHeaderText('Monitoreo de Mallas');
        break;
      default:
        setHeaderText('');
        break;
    }

  }, [currentModal])

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
                <div slot="content" className="ion-padding">
                  <MonitoringOptionsScreen
                    showReturnButton={false}
                    onOptionSelect={(option) => handleOptionSelect(option)}
                  />
                </div>
              )}

              {activeSegment === 'historial' && (
                <>
                  {/* camas */}
                  <IonCard onClick={handleModal('view-camas')}>
                    <IonCardHeader>
                      <IonCardTitle>Monitoreo por camas</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Ver historial de monitoreos realizados anteriormente
                    </IonCardContent>
                  </IonCard>

                  {/* placas */}
                  <IonCard onClick={handleModal('view-placas')}>
                    <IonCardHeader>
                      <IonCardTitle>Monitoreo por placas</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Ver historial de placas
                    </IonCardContent>
                  </IonCard>

                  {/* mallas */}
                  <IonCard onClick={handleModal('view-mallas')}>
                    <IonCardHeader>
                      <IonCardTitle>Monitoreo por Mallas</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Ver historial de mallas
                    </IonCardContent>
                  </IonCard>
                </>
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
          headerText={headerText}
        >
          <>
            {currentModal === 'view-camas' && <ViewMonitoredC />}
            {currentModal === 'view-placas' && <ViewMonitoredPlacas />}
            {currentModal === 'view-mallas' && <ViewMonitoredMallas />}
            {currentModal === 'monitorear-camas' && <MonitoreoC />}
            {currentModal === 'monitorear-placas' && <MonitoreoPlacas />}
            {currentModal === 'monitorear-mallas' && <MonitoreoMallas />}
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
  headerText: string;
}> = ({ IsOpenModal, setIsOpenModal, headerText, children }) => {
  return (
    <IonModal
      isOpen={IsOpenModal}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      onDidDismiss={() => setIsOpenModal(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{headerText}</IonTitle>
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
