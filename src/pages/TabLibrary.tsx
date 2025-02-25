import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const TabLibrary: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Library</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Library</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <h2>Your Library</h2>
          <p>Access your saved music, playlists, and downloads.</p>
          <div className="example-content">Library content</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabLibrary;
