import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import { timeOutline } from 'ionicons/icons';

const TabFacturaCompra: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Factura Compra</IonTitle>
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
            <video controls width="100%" preload="metadata" poster="miniatura.jpg">
                <source src="assets/videor/fact-compra.webm" type="video/webm" />
                Tu navegador no soporta el video.
              </video>
              <p>La funcionalidad de factura compra estará disponible pronto.</p>
              <p>Estamos trabajando para ofrecerte la mejor experiencia.</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabFacturaCompra; 