import { IonAlert, IonButton, IonIcon, IonItem, IonLabel, IonPopover, IonSelect, IonSelectOption, IonToast, SelectChangeEventDetail, SelectCustomEvent } from '@ionic/react';
import { NUMERO_MAX, NUMERO_MIN, STORE_MONITORED_VAR } from '../helpers/bloquesConstant';
import { addCircle, informationCircleOutline, removeCircle } from 'ionicons/icons';
import LabelMonitoring from './LabelMonitoring';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedDiseases, setSelectedCuadros, setSelectedCuadro, setSelectedCama, setActiveSegment, setIsToastSavedOpen, setSelectedWeek } from '../store/slices/monitoringBloqueSlice';
import { CURRENT_WEEK_NUMBER, sleep } from '../helpers/regularHelper';

const DISPLAY_TOAST_SECONDS = 3

const SegmentMonitoreoCamas = () => {
  const dispatch = useAppDispatch();

  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);
  const selectedCuadro = useAppSelector(state => state.monitoringBloque.selectedCuadro);
  const selectedCama = useAppSelector(state => state.monitoringBloque.selectedCama);
  const IsToastSavedOpen = useAppSelector(state => state.monitoringBloque.IsToastSavedOpen);
  const selectedWeek = useAppSelector(state => state.monitoringBloque.selectedWeek);
  const [showNumSemana, setShowNumSemana] = useState<boolean>(false);


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



  const setSelectedCuadroUndefined = async () => {
    if (IsToastSavedOpen) {
      await sleep(DISPLAY_TOAST_SECONDS + 1)
      dispatch(setSelectedCuadro(undefined));
    }
  }

  useEffect(() => {
    setSelectedCuadroUndefined()
  }, [IsToastSavedOpen])


  const handleSelectCama = (index: number) => () => {
    dispatch(setSelectedDiseases([]));
    dispatch(setSelectedCuadros([]));
    dispatch(setSelectedCuadro(undefined));
    dispatch(setSelectedCama(index));
    dispatch(setActiveSegment('cuadros'))
  }

  const handleSelector = (value: number) => {
    dispatch(setSelectedWeek(value));
  }

  return (
    <>
      {selectedBloque
        ?
        <div>
          <IonButton
            fill="outline"
            expand="block"
            onClick={() => setShowNumSemana(!showNumSemana)}
          >
            {showNumSemana ? 'Ocultar semana' : 'mostrar semana'}
          </IonButton>
          <br />
          {showNumSemana &&
            <div style={{ marginBottom: '2rem' }}>
              < IonSelect label="Seleccione semana" labelPlacement="floating" fill="outline"
                onIonChange={(e) => handleSelector(e.detail.value)} value={selectedWeek || CURRENT_WEEK_NUMBER}>
                {Array.from({ length: CURRENT_WEEK_NUMBER }, (_, index) => (
                  <IonSelectOption key={index + 1} value={index + 1}>
                    Semana {index + 1}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>
          }

          <br />
          <IonLabel>Seleccione numero de cama</IonLabel>
          <br />
          <br />

          {Array.from({ length: selectedBloque.numCamas }, (_, index) => (
            <IonButton
              key={index}
              fill={selectedCama === index + 1 ? 'solid' : 'outline'}
              size='large'
              color={selectedCama === index + 1 ? 'primary' : 'default'}
              onClick={handleSelectCama(index + 1)}
            >
              <IonLabel>{index + 1}</IonLabel>
            </IonButton>
          ))}

        </div >
        :
        null}



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