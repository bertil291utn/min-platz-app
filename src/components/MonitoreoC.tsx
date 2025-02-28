import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonTitle } from '@ionic/react';
import { addCircle, removeCircle } from 'ionicons/icons';
import { useState } from 'react';
import { NUMERO_MAX, NUMERO_MIN } from '../bloquesConstant';

const MonitoreoC = () => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => () => {
    if (count < NUMERO_MAX) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => () => {
    if (count > NUMERO_MIN) {
      setCount((prev) => prev - 1);
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
          <IonLabel>{count}</IonLabel>
          <IonButton size='large' fill="clear" onClick={handleIncrement()}>
            <IonIcon slot="icon-only" ios={addCircle} md={addCircle}></IonIcon>
          </IonButton>
        </div>
      </IonItem>



    </div>

  );
}

export default MonitoreoC;