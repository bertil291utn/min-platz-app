import { IonAlert, IonButton, IonIcon, IonItem, IonLabel, IonPopover, IonToast } from '@ionic/react';
import { NUMERO_MAX, NUMERO_MIN, STORE_MONITORED_VAR } from '../helpers/bloquesConstant';
import { addCircle, informationCircleOutline, removeCircle } from 'ionicons/icons';
import { getSpanishOrdinal } from '../helpers/viewHelper';
import ReturnButtonC from './ReturnButtonC';
import LabelMonitoring from './LabelMonitoring';
import { BloqueMonitored } from '../interfaces/Monitoring';
import { useEffect, useState } from 'react';
import { CURRENT_DATE_UTC5, getWeekNumber, sleep } from '../helpers/regularHelper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedDiseases, setSelectedCuadros, setSelectedCuadro, setSelectedCama, setActiveSegment, setIsToastSavedOpen } from '../store/slices/monitoringBloqueSlice';

const DISPLAY_TOAST_SECONDS = 3

const SegmentMonitoreoCamas = () => {
  const dispatch = useAppDispatch();

  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);
  const selectedCuadro = useAppSelector(state => state.monitoringBloque.selectedCuadro);
  const selectedCama = useAppSelector(state => state.monitoringBloque.selectedCama);
  const expertUser = useAppSelector(state => state.auth.expertUser);
  const IsToastSavedOpen = useAppSelector(state => state.monitoringBloque.IsToastSavedOpen);


  const [displayAlert, setDisplayAlert] = useState(false);

  const handleIncrement = () => () => {
    if (selectedCama < NUMERO_MAX) {
      dispatch(setSelectedDiseases([]));
      dispatch(setSelectedCuadros([]));
      dispatch(setSelectedCuadro(undefined));
      dispatch(setSelectedCama(selectedCama + 1));
    }
  };

  const handleDecrement = () => () => {
    if (selectedCama > NUMERO_MIN) {
      dispatch(setSelectedDiseases([]));
      dispatch(setSelectedCuadros([]));
      dispatch(setSelectedCuadro(undefined));
      dispatch(setSelectedCama(selectedCama - 1));
    }
  };


  const handleSelectCuadro = (cuadro: number) => () => {
    dispatch(setSelectedDiseases([]))
    dispatch(setSelectedCuadros([]))
    dispatch(setSelectedCuadro(cuadro));
    const currentWeekNumber = getWeekNumber(CURRENT_DATE_UTC5);
    const existingData = localStorage.getItem(STORE_MONITORED_VAR);


    if (!existingData) { dispatch(setActiveSegment('diseases')); return; }

    const parsedData: BloqueMonitored[] = JSON.parse(existingData as string);
    const bloqueIndex = parsedData?.findIndex(b => b.id == selectedBloque?.id && b.weekNumber === currentWeekNumber)
    const bloque = parsedData[bloqueIndex]
    const camasIndex = bloque?.camas?.findIndex(c => c.id == selectedCama)
    if (camasIndex == -1) { dispatch(setActiveSegment('diseases')); return }
    const cama = bloque?.camas[camasIndex]

    let cuadroIndex = -1;
    if (bloque?.weekNumber === currentWeekNumber)
      cuadroIndex = cama?.cuadros?.findIndex(c => c.id == cuadro)

    if (cuadroIndex == -1) { dispatch(setActiveSegment('diseases')); return; }
    setDisplayAlert(true);
    const cuadros = cama?.cuadros ?? [];
    dispatch(setSelectedCuadros(cuadros));
    dispatch(setSelectedDiseases(cuadros[cuadroIndex]?.diseases ?? []));


  }

  const setSelectedCuadroUndefined = async () => {
    if (IsToastSavedOpen) {
      await sleep(DISPLAY_TOAST_SECONDS + 1)
      dispatch(setSelectedCuadro(undefined));
    }
  }

  useEffect(() => {
    setSelectedCuadroUndefined()
  }, [IsToastSavedOpen])


  const editCuadro = () => {
    dispatch(setActiveSegment('diseases'));
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
        onDidDismiss={() => dispatch(setIsToastSavedOpen(false))}
        duration={DISPLAY_TOAST_SECONDS * 1000}
      ></IonToast>
    </>
  );
}

export default SegmentMonitoreoCamas;