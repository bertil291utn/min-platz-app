import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';
import SettingsC from '../components/SettingsComponent';

const TabSearch: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <SettingsC/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabSearch;
