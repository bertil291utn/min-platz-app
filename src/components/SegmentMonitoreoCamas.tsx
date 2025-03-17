import { IonAlert, IonButton, IonIcon, IonItem, IonLabel, IonPopover, IonToast } from '@ionic/react';
import { NUMERO_MAX, NUMERO_MIN, STORE_MONITORED_VAR } from '../helpers/bloquesConstant';
import { addCircle, informationCircleOutline, removeCircle } from 'ionicons/icons';
import { getSpanishOrdinal } from '../helpers/viewHelper';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import ReturnButtonC from './ReturnButtonC';
import LabelMonitoring from './LabelMonitoring';
import { BloqueMonitored } from '../interfaces/Monitoring';
import { useEffect, useState } from 'react';
import { CURRENT_DATE_UTC5, getWeekNumber, sleep } from '../helpers/regularHelper';
import { useAuth } from '../contexts/AuthContext';

const DISPLAY_TOAST_SECONDS = 3

const SegmentMonitoreoCamas = () => {
  const {
    selectedBloque,
    setSelectedCuadro,
    selectedCuadro,
    setSelectedCama,
    selectedCama,
    setActiveSegment,
    setSelectedDiseases,
    setSelectedCuadros,
    setIsToastSavedOpen,
    IsToastSavedOpen
  } = useMonitoringBloque();
  const { expertUser } = useAuth();

  const [displayAlert, setDisplayAlert] = useState(false);

  const handleIncrement = () => () => {
    if (selectedCama < NUMERO_MAX) {
      setSelectedDiseases([]);
      setSelectedCuadros([]);
      setSelectedCuadro(undefined);
      setSelectedCama((prev) => prev + 1);
    }
  };

  const handleDecrement = () => () => {
    if (selectedCama > NUMERO_MIN) {
      setSelectedDiseases([]);
      setSelectedCuadros([]);
      setSelectedCuadro(undefined);
      setSelectedCama((prev) => prev - 1);
    }
  };


  const handleSelectCuadro = (cuadro: number) => () => {
    setSelectedDiseases([])
    setSelectedCuadros([])
    setSelectedCuadro(cuadro);
    const currentWeekNumber = getWeekNumber(CURRENT_DATE_UTC5);
    const existingData = localStorage.getItem(STORE_MONITORED_VAR);


    if (!existingData) { setActiveSegment('diseases'); return; }

    const parsedData: BloqueMonitored[] = JSON.parse(existingData as string);
    const bloqueIndex = parsedData?.findIndex(b => b.id == selectedBloque?.id && b.weekNumber === currentWeekNumber)
    const bloque = parsedData[bloqueIndex]
    const camasIndex = bloque?.camas?.findIndex(c => c.id == selectedCama)
    if (camasIndex == -1) { setActiveSegment('diseases'); return }
    const cama = bloque?.camas[camasIndex]

    let cuadroIndex = -1;
    if (bloque?.weekNumber === currentWeekNumber)
      cuadroIndex = cama?.cuadros?.findIndex(c => c.id == cuadro)

    if (cuadroIndex == -1) { setActiveSegment('diseases'); return; }
    setDisplayAlert(true);
    const cuadros = cama?.cuadros ?? [];
    setSelectedCuadros(cuadros);
    setSelectedDiseases(cuadros[cuadroIndex]?.diseases ?? []);


  }

  const setSelectedCuadroUndefined = async () => {
    if (IsToastSavedOpen) {
      await sleep(DISPLAY_TOAST_SECONDS + 1)
      setSelectedCuadro(undefined);
    }
  }

  useEffect(() => {
    setSelectedCuadroUndefined()
  }, [IsToastSavedOpen])


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
            <IonButton size="large" onClick={handleDecrement()}>
              <IonIcon slot="icon-only" ios={removeCircle} md={removeCircle}></IonIcon>
            </IonButton>
            <IonLabel>{selectedCama}</IonLabel>
            <IonButton size="large" onClick={handleIncrement()}>
              <IonIcon slot="icon-only" ios={addCircle} md={addCircle}></IonIcon>
            </IonButton>

          </div>
          <br />
          <IonLabel>Seleccione el cuadro </IonLabel>
          {!expertUser &&
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IonButton fill="clear" size="small" id="info-tooltip">
                Que es Entrada y salida?
              </IonButton>
              <IonPopover trigger="info-tooltip" triggerAction="click" side='top' alignment='center'>
                <div className="ion-padding">
                  <p>Entrada es el lado que está en el camino y salida es el lado contrario, es decir el que no está en el camino.</p>
                </div>
              </IonPopover>
            </div>}


          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <br />

            <div>
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

      <IonToast
        isOpen={IsToastSavedOpen}
        message={`Monitoreo de cuadro #${selectedCuadro}, cama #${selectedCama} guardado`}
        onDidDismiss={() => setIsToastSavedOpen(false)}
        duration={DISPLAY_TOAST_SECONDS * 1000}
      ></IonToast>
    </>
  );
}

export default SegmentMonitoreoCamas;