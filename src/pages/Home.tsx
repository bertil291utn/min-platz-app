import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonCardContent } from '@ionic/react';
import { timeOutline } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Principal</IonTitle>
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
              <p>La funcionalidad de casa estará disponible pronto.</p>
              <p>Estamos trabajando para ofrecerte la mejor experiencia.</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
