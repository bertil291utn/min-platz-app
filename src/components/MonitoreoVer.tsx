import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonLabel,
  IonTitle,
  IonCardTitle,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
} from '@ionic/react';
import { MonitoringModal } from '../interfaces/Monitoring';
import MonitoreoModal from './MonitoreoModal';

const MonitoreoVer: React.FC = () => {
  const [currentModal, setCurrentModal] = useState<MonitoringModal | undefined>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [headerText, setHeaderText] = useState<string>('');

  const handleOptionSelect = (option: MonitoringModal) => {
    setCurrentModal(option);
    setIsOpenModal(true);
    switch (option) {
      case 'view-camas':
        setHeaderText('Ver Monitoreo de Camas');
        break;
      case 'view-placas':
        setHeaderText('Ver Monitoreo de Placas');
        break;
      case 'view-mallas':
        setHeaderText('Ver Monitoreo de Mallas');
        break;
      default:
        setHeaderText('');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ver Monitoreo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard
          button
          onClick={() => handleOptionSelect('view-camas')}>
          <IonCardHeader>
            <IonCardTitle>Monitoreo por camas</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>Ver historial de monitoreo por camas</IonLabel>
          </IonCardContent>
        </IonCard>

        <IonCard
          button 
          onClick={() => handleOptionSelect('view-placas')}
        >
          <IonCardHeader>
            <IonCardTitle>Monitoreo por placas</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>Ver historial de monitoreo por placas</IonLabel>
          </IonCardContent>
        </IonCard>

        <IonCard
          button 
          onClick={() => handleOptionSelect('view-mallas')}
        >
          <IonCardHeader>
            <IonCardTitle>Monitoreo por Mallas</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>Ver historial de monitoreo por mallas</IonLabel>
          </IonCardContent>
        </IonCard>

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

export default MonitoreoVer; 