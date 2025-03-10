import { IonAlert, IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { NUMERO_MAX, NUMERO_MIN, STORE_MONITORED_VAR } from '../helpers/bloquesConstant';
import { addCircle, removeCircle } from 'ionicons/icons';
import { getSpanishOrdinal } from '../helpers/viewHelper';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import ReturnButtonC from './ReturnButtonC';
import LabelMonitoring from './LabelMonitoring';
import { BloqueMonitored } from '../interfaces/Monitoring';
import { useState } from 'react';

const SegmentMonitoreoCamas = () => {
  const {
    selectedBloque,
    setSelectedCuadro,
    selectedCuadro,
    setSelectedCama,
    selectedCama,
    setActiveSegment,
    setSelectedDiseases,
    setSelectedCuadros
  } = useMonitoringBloque();

  const [displayAlert, setDisplayAlert] = useState(false);

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
    setSelectedDiseases([])
    setSelectedCuadros([])
    setSelectedCuadro(cuadro);
    const existingData = localStorage.getItem(STORE_MONITORED_VAR);

    if (!existingData) { setActiveSegment('diseases'); return; }

    const parsedData: BloqueMonitored[] = JSON.parse(existingData as string);
    const bloqueIndex = parsedData?.findIndex(b => b.id == selectedBloque?.id)
    const bloque = parsedData[bloqueIndex]
    const camasIndex = bloque?.camas?.findIndex(c => c.id == selectedCama)
    if (camasIndex == -1) { setActiveSegment('diseases'); return }
    const cama = bloque?.camas[camasIndex]
    const IsCuadroMonitoreado = cama?.cuadros?.findIndex(c => c.id == cuadro) ?? -1;

    if (IsCuadroMonitoreado == -1) { setActiveSegment('diseases'); return; }
    setDisplayAlert(true);
    const cuadros = cama?.cuadros ?? [];
    setSelectedCuadros(cuadros);
    setSelectedDiseases(cuadros[IsCuadroMonitoreado]?.diseases ?? []);


  }

  const editCuadro = () => {
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

      <IonAlert
        header={`El cuadro #${selectedCuadro}, cama #${selectedCama} ya esta monitoreado`}
        subHeader='Monitorear otra vez?'
        isOpen={displayAlert}
        buttons={[
          {

            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Si',
            role: 'confirm',
            handler: () => {
              editCuadro()
            },
          },
        ]}
        onDidDismiss={() => setDisplayAlert(false)}
      ></IonAlert>
    </>
  );
}

export default SegmentMonitoreoCamas;