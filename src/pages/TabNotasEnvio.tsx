import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';

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
          <h2>Página de Notas de Envío</h2>
          {/* Aquí irá el contenido de la página de notas de envío */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabNotasEnvio; 