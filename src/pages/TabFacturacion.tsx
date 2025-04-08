import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const TabFacturacion: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Facturación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h2>Página de Facturación</h2>
          {/* Aquí irá el contenido de la página de facturación */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabFacturacion; 