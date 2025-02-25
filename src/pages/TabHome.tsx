import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

interface TabHomeProps {
  logout: () => void;
}

const TabHome: React.FC<TabHomeProps> = ({ logout }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listen Now</IonTitle>
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
          <h2>Welcome to Listen Now</h2>
          <p>Discover your favorite music and podcasts.</p>
          <ExploreContainer />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabHome;
