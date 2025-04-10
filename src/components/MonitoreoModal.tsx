import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
} from '@ionic/react';
import { MonitoringModal } from '../interfaces/Monitoring';
import ViewMonitoredC from './ViewMonitoredC';
import ViewMonitoredPlacas from './ViewMonitoredPlacas';
import ViewMonitoredMallas from './ViewMonitoredMallas';
import MonitoreoC from './MonitoreoC';
import MonitoreoPlacas from './MonitoreoPlacas';
import MonitoreoMallas from './MonitoreoMallas';

interface MonitoreoModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerText: string;
  currentModal?: MonitoringModal;
}

const MonitoreoModal: React.FC<MonitoreoModalProps> = ({
  isOpen,
  onClose,
  headerText,
  currentModal
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      onDidDismiss={onClose}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{headerText}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {currentModal === 'view-camas' && <ViewMonitoredC />}
        {currentModal === 'view-placas' && <ViewMonitoredPlacas />}
        {currentModal === 'view-mallas' && <ViewMonitoredMallas />}
        {currentModal === 'monitorear-camas' && <MonitoreoC />}
        {currentModal === 'monitorear-placas' && <MonitoreoPlacas />}
        {currentModal === 'monitorear-mallas' && <MonitoreoMallas />}
      </IonContent>
    </IonModal>
  );
};

export default MonitoreoModal; 