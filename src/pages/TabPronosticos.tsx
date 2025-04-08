import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { timeOutline, cloudyOutline } from 'ionicons/icons';

const TabPronosticos: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Pronósticos Climáticos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">
                <IonIcon icon={cloudyOutline} style={{ fontSize: '48px', color: 'var(--ion-color-medium)' }} />
              </IonCardTitle>
              <IonCardTitle className="ion-text-center">Próximamente</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="ion-text-center">
              <p>La funcionalidad de pronósticos climáticos estará disponible pronto.</p>
              <p>Estamos trabajando para brindarte información meteorológica precisa y actualizada que te ayude en la toma de decisiones.</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabPronosticos; 