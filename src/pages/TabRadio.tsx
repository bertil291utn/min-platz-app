import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const TabRadio: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Radio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Radio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <h2>Radio Stations</h2>
          <p>Browse and listen to your favorite radio stations.</p>
          <div className="example-content">Radio content</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabRadio;
