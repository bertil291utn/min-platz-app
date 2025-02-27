import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { INITIAL_BLOQUE, useBloqueInfo } from '../contexts/BloqueInfoContext';

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

  const isObjEqual = (obj1: any, obj2: any): boolean => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  const IsNoBloques = bloques?.length === 1 && isObjEqual(bloques[0], INITIAL_BLOQUE);

  return (
    <IonAccordionGroup>
      <IonAccordion value="first">
        <IonItem slot="header" color="light">
          <IonLabel>Bloques</IonLabel>
        </IonItem>
        <div className="ion-padding" slot="content">
          {IsNoBloques ? (
            <div className="ion-text-center">
              <p>No hay bloques</p>
              <IonButton onClick={handleIncrement}>
                Añadir bloques
              </IonButton>
            </div>
          ) : (
            <p>bloques</p>
          )}
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}

export default SettingsC;