import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { NUMERO_MAX, NUMERO_MIN } from '../helpers/bloquesConstant';
import { addCircle, removeCircle } from 'ionicons/icons';
import { getSpanishOrdinal } from '../helpers/viewHelper';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import ReturnButtonC from './ReturnButtonC';
import LabelMonitoring from './LabelMonitoring';

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
          <ReturnButtonC
            segmentReturn={'bloques'}
          />
          <LabelMonitoring />

          <br />
          <IonLabel>Seleccione numero de cama</IonLabel>
          <br />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <IonButton fill="clear" onClick={handleDecrement()} size='large'>
              <IonIcon slot="icon-only" ios={removeCircle} md={removeCircle}></IonIcon>
            </IonButton>
            <IonLabel>{selectedCama}</IonLabel>
            <IonButton size='large' fill="clear" onClick={handleIncrement()}>
              <IonIcon slot="icon-only" ios={addCircle} md={addCircle}></IonIcon>
            </IonButton>
          </div>
          <br />
          <IonLabel>Seleccione el cuadro </IonLabel>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                      : `${getSpanishOrdinal(selectedBloque.numCuadrosPerCama - index)} cuadro desde salida`
                    }
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