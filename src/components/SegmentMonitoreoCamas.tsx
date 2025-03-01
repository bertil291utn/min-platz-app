import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { NUMERO_MAX, NUMERO_MIN } from '../helpers/bloquesConstant';
import { addCircle, removeCircle } from 'ionicons/icons';
import { getSpanishOrdinal } from '../helpers/viewHelper';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';

const SegmentMonitoreoCamas = () => {
  const {
    selectedBloque,
    setSelectedCuadro,
    selectedCuadro,
    setSelectedCama,
    selectedCama,
    setActiveSegment
  } = useMonitoringBloque();



  const handleIncrement = () => () => {
    if (selectedCama < NUMERO_MAX) {
      setSelectedCama((prev) => prev + 1);
    }
  };

  const handleDecrement = () => () => {
    if (selectedCama > NUMERO_MIN) {
      setSelectedCama((prev) => prev - 1);
    }
  };


  const handleSelectCuadro = (cuadro: number) => () => {
    setSelectedCuadro(cuadro);
    setActiveSegment('diseases');
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
              <IonLabel>{selectedCama}</IonLabel>
              <IonButton size='large' fill="clear" onClick={handleIncrement()}>
                <IonIcon slot="icon-only" ios={addCircle} md={addCircle}></IonIcon>
              </IonButton>
            </div>
          </IonItem>
          <br />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <h1>Cama #{selectedCama}</h1>
              {selectedCuadro ? <h1>Cuadro #{selectedCuadro}</h1> : null}
            </div>
            <br />

            <div style={{ height: '50vh', overflowY: 'scroll' }}>
              {[...Array(selectedBloque.numCuadrosPerCama)].map((_, index) => (
                <IonButton
                  key={index}
                  expand='block'
                  fill={selectedCuadro === index + 1 ? 'solid' : 'outline'}
                  size='large'
                  color={selectedCuadro === index + 1 ? 'primary' : 'default'}
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