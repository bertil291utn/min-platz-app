import React, { useState, useEffect } from 'react';
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonLabel,
  IonIcon,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/react';
import { calendarOutline, businessOutline } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectActiveBloques } from '../store/slices/bloqueInfoSlice';
import {
  setSelectedBloque as setMonitoringBloque,
  setSelectedWeek
} from '../store/slices/monitoringBloqueSlice';
import MonitoringOptionsScreen from './MonitoringOptionsScreen';
import { CURRENT_WEEK_NUMBER } from '../helpers/regularHelper';
import { MonitoringModal } from '../interfaces/Monitoring';
import MonitoreoModal from './MonitoreoModal';

const MonitoreoNuevo: React.FC = () => {
  const [showWeekSelector, setShowWeekSelector] = useState<boolean>(false);
  const [showBloqueSelector, setShowBloqueSelector] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<MonitoringModal | undefined>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [headerText, setHeaderText] = useState<string>('');

  const dispatch = useAppDispatch();
  const activeBloques = useAppSelector(selectActiveBloques);
  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);
  const selectedWeek = useAppSelector(state => state.monitoringBloque.selectedWeek) || CURRENT_WEEK_NUMBER;

  useEffect(() => {
    if (activeBloques.length > 0 && !selectedBloque) {
      const defaultBloque = activeBloques.find(b => b.id === 1) || activeBloques[0];
      dispatch(setMonitoringBloque(defaultBloque));
    }
  }, [activeBloques, selectedBloque, dispatch]);

  const handleWeekSelect = (weekNumber: number) => {
    dispatch(setSelectedWeek(weekNumber));
    setShowWeekSelector(false);
  };

  const handleBloqueSelect = (bloque: any) => {
    dispatch(setMonitoringBloque(bloque));
    setShowBloqueSelector(false);
  };

  const handleOptionSelect = (option: MonitoringModal) => {
    setCurrentModal(option);
    setIsOpenModal(true);
    switch (option) {
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
    }
  };

  const IsThereActiveBloques = activeBloques.length > 0;

  if (!IsThereActiveBloques) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Monitoreo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>No hay bloques activos</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Monitoreo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div slot="content">
          <IonCard className="ion-margin-bottom">
            <IonCardContent>
              <IonGrid>
                <IonRow className="ion-align-items-center">
                  <IonCol size="auto">
                    <IonChip 
                      color="secondary"
                      onClick={() => setShowBloqueSelector(!showBloqueSelector)}
                      outline
                    >
                      <IonIcon icon={businessOutline} />
                      <IonLabel>{selectedBloque ? selectedBloque.name : 'Cargando...'}</IonLabel>
                    </IonChip>
                  </IonCol>
                </IonRow>

                {showBloqueSelector && (
                  <IonRow className="ion-margin-top">
                    <IonCol>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                        {activeBloques.map((bloque) => (
                          <IonChip
                            key={bloque.id}
                            color={selectedBloque?.id === bloque.id ? 'secondary' : undefined}
                            onClick={() => handleBloqueSelect(bloque)}
                          >
                            <IonLabel>{bloque.name}</IonLabel>
                          </IonChip>
                        ))}
                      </div>
                    </IonCol>
                  </IonRow>
                )}
                
                <IonRow className="ion-align-items-center ion-margin-top">
                  <IonCol size="auto">
                    <IonChip 
                      color="secondary" 
                      outline={true}
                      onClick={() => setShowWeekSelector(!showWeekSelector)}
                    >
                      <IonIcon icon={calendarOutline} />
                      <IonLabel>Semana {selectedWeek}</IonLabel>
                    </IonChip>
                  </IonCol>
                </IonRow>
                
                {showWeekSelector && (
                  <IonRow className="ion-margin-top">
                    <IonCol>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                        {Array.from({ length: CURRENT_WEEK_NUMBER }, (_, i) => CURRENT_WEEK_NUMBER - i).map((week) => (
                          <IonChip
                            key={week}
                            color={week === selectedWeek ? 'secondary' : undefined}
                            onClick={() => handleWeekSelect(week)}
                          >
                            <IonLabel>Semana {week}</IonLabel>
                          </IonChip>
                        ))}
                      </div>
                    </IonCol>
                  </IonRow>
                )}
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </div>

        {selectedBloque && (
          <MonitoringOptionsScreen
            showReturnButton={false}
            onOptionSelect={handleOptionSelect}
          />
        )}

        <MonitoreoModal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          headerText={headerText}
          currentModal={currentModal}
        />
      </IonContent>
    </IonPage>
  );
};

export default MonitoreoNuevo; 