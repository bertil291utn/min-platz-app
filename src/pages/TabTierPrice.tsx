import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';
import TierPrice from '../components/TierPrice';

const TabTierPrice: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Planes y Precios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TierPrice />
      </IonContent>
    </IonPage>
  );
};

export default TabTierPrice; 