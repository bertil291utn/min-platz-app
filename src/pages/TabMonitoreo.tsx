import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import MonitoreoNuevo from '../components/MonitoreoNuevo';
import MonitoreoVer from '../components/MonitoreoVer';

interface TabMonitoreoProps {
  initialSegment?: 'monitorear' | 'historial';
}

const TabMonitoreo: React.FC<TabMonitoreoProps> = ({ initialSegment = 'monitorear' }) => {
  const location = useLocation();
  const isMonitorear = location.pathname === '/monitoreo/nuevo';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            {isMonitorear ? 'Monitoreo' : 'Ver Monitoreo'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isMonitorear ? <MonitoreoNuevo /> : <MonitoreoVer />}
      </IonContent>
    </IonPage>
  );
};

export default TabMonitoreo;
