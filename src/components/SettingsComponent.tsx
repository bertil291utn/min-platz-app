import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { useBloqueInfo } from '../contexts/BloqueInfoContext';

const SettingsC = () => {
  const { bloques, addBloque, removeBloque } = useBloqueInfo();

  const handleIncrement = () => {
    addBloque();
  };

  const handleDecrement = () => {
    if (bloques.length > 0) {
      removeBloque(bloques[bloques.length - 1].id);
    }
  };


  return (
    <IonAccordionGroup>
      <IonAccordion value="first">
        <IonItem slot="header" color="light">
          <IonLabel>Bloques</IonLabel>
        </IonItem>
        <div className="ion-padding" slot="content">
          <IonItem>
            <IonLabel>Numero de bloques</IonLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IonButton fill="clear" onClick={handleDecrement} size='large'>
                <IonIcon slot="icon-only" ios={removeCircleOutline} md={removeCircleOutline}></IonIcon>
              </IonButton>
              <IonLabel>{bloques.length}</IonLabel>
              <IonButton size='large' fill="clear" onClick={handleIncrement}>
                <IonIcon slot="icon-only" ios={addCircleOutline} md={addCircleOutline}></IonIcon>
              </IonButton>
            </div>
          </IonItem>
        </div>
      </IonAccordion>
      <IonAccordion value="second">
        <IonItem slot="header" color="light">
          <IonLabel>Naves</IonLabel>
        </IonItem>
        <div className="ion-padding" slot="content">
        </div>
      </IonAccordion>
      <IonAccordion value="third">
        <IonItem slot="header" color="light">
          <IonLabel>Info naves</IonLabel>
        </IonItem>
        <div className="ion-padding" slot="content">
          Third Content
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}

export default SettingsC;