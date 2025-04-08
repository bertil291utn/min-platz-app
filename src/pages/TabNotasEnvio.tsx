import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { timeOutline } from 'ionicons/icons';

const TabNotasEnvio: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Notas de Envío</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">
                <IonIcon icon={timeOutline} style={{ fontSize: '48px', color: 'var(--ion-color-medium)' }} />
              </IonCardTitle>
              <IonCardTitle className="ion-text-center">Próximamente</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="ion-text-center">
              <p>La funcionalidad de notas de envío estará disponible pronto.</p>
              <p>Estamos trabajando para ofrecerte la mejor experiencia.</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabNotasEnvio; 