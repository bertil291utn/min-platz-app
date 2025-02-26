import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import Home from './Home';

interface TabHomeProps {
  logout: () => void;
}

const TabHome: React.FC<TabHomeProps> = ({ logout }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="end" onClick={logout} fill="clear">
            Logout
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Listen Now</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <Home />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabHome;
