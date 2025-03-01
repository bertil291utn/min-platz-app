import { IonButton, IonContent, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { useState } from 'react';
import { NUMERO_MAX, NUMERO_MIN } from '../helpers/bloquesConstant';
import { addCircle, removeCircle } from 'ionicons/icons';
import { getSpanishOrdinal } from '../helpers/viewHelper';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';

const SegmentMonitoreoCamas = () => {
  const { selectedBloque, setSelectedCuadro } = useMonitoringBloque();

  const [camaNumber, setCamaNumber] = useState(1);
  const [cuadroNumber, setCuadroNumber] = useState(1);


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


  const handleSelectCuadro = (cuadro: number) => () => {
    setSelectedCuadro(cuadro);
    setCuadroNumber(cuadro)
  }

  return (
    <>
      {selectedBloque
        ?
        <div>
          <h3 className='ion-text-center'>{selectedBloque.name}</h3>
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <h1>Cama #{camaNumber}</h1>
              <h1>Cuadro #{cuadroNumber}</h1>
            </div>
            <br />

            <div style={{ height: '50vh', overflowY: 'scroll' }}>
              {[...Array(selectedBloque.numCuadrosPerCama)].map((_, index) => (
                <IonButton
                  key={index}
                  expand='block'
                  fill={cuadroNumber === index + 1 ? 'solid' : 'outline'}
                  size='large'
                  color={cuadroNumber === index + 1 ? 'primary' : 'default'}
                  onClick={handleSelectCuadro(index + 1)}
                >
                  <IonLabel>
                    {index + 1 <= Math.ceil(selectedBloque.numCuadrosPerCama / 2)
                      ? `${getSpanishOrdinal(index + 1)} cuadro desde entrada`
                      : index + 1 === selectedBloque.numCuadrosPerCama
                        ? 'Último cuadro desde salida'
                        : `${getSpanishOrdinal(selectedBloque.numCuadrosPerCama - index)} cuadro desde salida`}
                  </IonLabel>
                </IonButton>
              ))}
            </div>

          </div>


        </div>
        :
        null}
    </>
  );
}

export default SegmentMonitoreoCamas;