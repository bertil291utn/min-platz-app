import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';

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
          <h2>Página de Factura Compra</h2>
          {/* Aquí irá el contenido de la página de factura compra */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabFacturaCompra; 