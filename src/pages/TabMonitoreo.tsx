import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MonitoreoC from '../components/MonitoreoC';

const TabMonitoreo: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="ion-padding">
          <MonitoreoC/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabMonitoreo;
