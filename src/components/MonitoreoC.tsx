import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonTitle } from '@ionic/react';
import { addCircle, removeCircle } from 'ionicons/icons';
import { useState } from 'react';
import { NUMERO_MAX, NUMERO_MIN } from '../bloquesConstant';

const MonitoreoC = () => {
  const [camaNumber, setCamaNumber] = useState(1);

  const handleIncrement = () => () => {
    if (camaNumber < NUMERO_MAX) {
      setCamaNumber((prev) => prev + 1);
    }
  };

  const handleDecrement = () => () => {
    if (camaNumber > NUMERO_MIN) {
      setCamaNumber((prev) => prev - 1);
    }
  };

  return (
    <div>
      <IonTitle>Monitoreo plantas</IonTitle>
      <br />
      <IonItem>
        <IonLabel>Ingrese el numero de cama a monitorear</IonLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IonButton fill="clear" onClick={handleDecrement()} size='large'>
            <IonIcon slot="icon-only" ios={removeCircle} md={removeCircle}></IonIcon>
          </IonButton>
          <IonLabel>{camaNumber}</IonLabel>
          <IonButton size='large' fill="clear" onClick={handleIncrement()}>
            <IonIcon slot="icon-only" ios={addCircle} md={addCircle}></IonIcon>
          </IonButton>
        </div>
      </IonItem>
<br />
      <IonItem >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>Cama #{camaNumber}</p>
          <p>Cuadro #{10}</p>
        </div>
      </IonItem>



    </div>

  );
}

export default MonitoreoC;