import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useBloqueInfo } from '../contexts/BloqueInfoContext';

const BloquesSettingsC = () => {

  const { bloques } = useBloqueInfo();
  return (
    <div>
      {bloques.map((bloque) =>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{bloque.name}</IonCardTitle>
            <IonCardSubtitle>{bloque.numCamas} camas - {bloque.numCuadrosPerCama} cuadros por cama</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>{bloque.description}</IonCardContent>
        </IonCard>
      )}

    </div>

  );
}

export default BloquesSettingsC;