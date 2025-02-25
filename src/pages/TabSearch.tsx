import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';

const TabSearch: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Search</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <IonSearchbar placeholder="Search for music, artists, or podcasts"></IonSearchbar>
          <div className="example-content">Search content</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabSearch;
