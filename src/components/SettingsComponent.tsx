import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/react';
const SettingsC = () => {
  return ( 
        <IonAccordionGroup>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel>Bloques</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              First Content
            </div>
          </IonAccordion>
          <IonAccordion value="second">
            <IonItem slot="header" color="light">
              <IonLabel>Naves</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              Second Content
            </div>
          </IonAccordion>
          <IonAccordion value="third">
            <IonItem slot="header" color="light">
              <IonLabel>Camas</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              Third Content
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      );
    }
 
export default SettingsC;