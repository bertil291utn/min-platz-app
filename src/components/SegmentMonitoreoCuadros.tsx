import { IonLabel, IonButton, IonPopover, IonAlert } from '@ionic/react';
import { getSpanishOrdinal } from '../helpers/viewHelper';
import { useState } from 'react';
import { STORE_MONITORED_VAR } from '../helpers/bloquesConstant';
import { getWeekNumber, CURRENT_DATE_UTC5, CURRENT_WEEK_NUMBER } from '../helpers/regularHelper';
import { BloqueMonitored } from '../interfaces/Monitoring';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedDiseases, setSelectedCuadros, setSelectedCuadro, setActiveSegment } from '../store/slices/monitoringBloqueSlice';
import LabelMonitoring from './LabelMonitoring';
import ReturnButtonC from './ReturnButtonC';

const SegmentMonitoreoCuadros = () => {

  const dispatch = useAppDispatch();

  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);
  const selectedCuadro = useAppSelector(state => state.monitoringBloque.selectedCuadro);
  const selectedCama = useAppSelector(state => state.monitoringBloque.selectedCama);
  const expertUser = useAppSelector(state => state.auth.expertUser);
  const selectedWeek = useAppSelector(state => state.monitoringBloque.selectedWeek);



  const [displayAlert, setDisplayAlert] = useState(false);


  const handleSelectCuadro = (cuadro: number) => () => {
    dispatch(setSelectedDiseases([]))
    dispatch(setSelectedCuadros([]))
    dispatch(setSelectedCuadro(cuadro));
    const existingData = localStorage.getItem(STORE_MONITORED_VAR);


    if (!existingData) { dispatch(setActiveSegment('diseases')); return; }
    const weekNumber = selectedWeek || CURRENT_WEEK_NUMBER
    const parsedData: BloqueMonitored[] = JSON.parse(existingData as string);
    const bloqueIndex = parsedData?.findIndex(b => b.id == selectedBloque?.id && b.weekNumber === weekNumber)
    const bloque = parsedData[bloqueIndex]
    const camasIndex = bloque?.camas?.findIndex(c => c.id == selectedCama)
    if (camasIndex == -1) { dispatch(setActiveSegment('diseases')); return }
    const cama = bloque?.camas[camasIndex]

    let cuadroIndex = -1;
    if (bloque?.weekNumber === weekNumber)
      cuadroIndex = cama?.cuadros?.findIndex(c => c.id == cuadro)

    if (cuadroIndex == -1) { dispatch(setActiveSegment('diseases')); return; }
    setDisplayAlert(true);
    const cuadros = cama?.cuadros ?? [];
    dispatch(setSelectedCuadros(cuadros));
    dispatch(setSelectedDiseases(cuadros[cuadroIndex]?.diseases ?? []));


  }

  const editCuadro = () => {
    dispatch(setActiveSegment('diseases'));
  }

  return selectedBloque ? (
    <>
      <ReturnButtonC
        segmentReturn={'camas'}
      />
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
  ) : <IonLabel className='ion-padding'>Selecciona un bloque</IonLabel>;
}

export default SegmentMonitoreoCuadros;