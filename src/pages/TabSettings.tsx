import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';

const TabSearch: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="ion-padding">
          <div className="example-content">Search content</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabSearch;
