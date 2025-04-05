import {
  IonCard, IonCardContent, IonChip, IonIcon, IonLabel, IonButton,
  IonTextarea, IonToast, IonSpinner, IonList, IonItem,
  IonCardHeader,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonAlert
} from '@ionic/react';
import { addCircle, arrowBack, removeCircle } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Disease } from '../interfaces/Diseases';
import { BloqueMonitored, CamaMonitored, CuadroMonitored } from '../interfaces/Monitoring';
import { CURRENT_WEEK_NUMBER } from '../helpers/regularHelper';
import { STORE_MONITORED_VAR } from '../helpers/bloquesConstant';
import {
  setActiveSegment, setSelectedCuadro, setSelectedCama,
  setSelectedDiseases, setIsEdit, fetchMonitoredBloques
} from '../store/slices/monitoringBloqueSlice';
import SegmentMonitoreoDiseases from './SegmentMonitoreoDiseases';
import SegmentMonitoreoCamas from './SegmentMonitoreoCamas';
import SegmentMonitoreoOptions from './SegmentMonitoreoOptions';
import { homeOutline } from 'ionicons/icons';
import SegmentMonitoreoCuadros from './SegmentMonitoreoCuadros';
import { SegmentBloque } from '../interfaces/Bloque';

const MonitoreoC = () => {
  const dispatch = useAppDispatch();
  const {
    activeSegment,
    selectedBloque,
    selectedCuadro,
    selectedCama,
    selectedDiseases,
    loading,
    isEdit,
    selectedWeek
  } = useAppSelector(state => state.monitoringBloque);

  const [displayAlert, setDisplayAlert] = useState<boolean>(false);

  useEffect(() => {
    // Al iniciar, establecer activeSegment a 'camas' si no hay uno definido
    if (!activeSegment || activeSegment === 'bloques') {
      dispatch(setActiveSegment('camas'));
    }
    
    // Cargar los bloques monitoreados
    dispatch(fetchMonitoredBloques());
  }, [dispatch]);

  const handleSegmentChange = (value: string) => {
    dispatch(setActiveSegment(value as SegmentBloque));
  };

  return (
    <div>
      <div className="sticky-header" style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
        <IonCard>
          <IonCardContent>
            <IonChip color="secondary">
              <IonLabel>{`Semana ${selectedWeek || CURRENT_WEEK_NUMBER}`}</IonLabel>
            </IonChip>

            {selectedBloque ? (
              <>
                <IonChip color="secondary">
                  <IonLabel>{selectedBloque.name}</IonLabel>
                </IonChip>
              </>
            ) : null}

            {selectedCama ? (
              <>
                <IonChip color="secondary"
                  onClick={() => {
                    dispatch(setActiveSegment('camas'));
                  }}
                >
                  <IonLabel>{`Cama ${selectedCama}`}</IonLabel>
                </IonChip>
              </>
            ) : null}
            {selectedCuadro ? (
              <>
                <IonChip color="secondary"
                  onClick={() => {
                    dispatch(setActiveSegment('cuadros'));
                  }}
                >
                  <IonLabel>{`Cuadro ${selectedCuadro}`}</IonLabel>
                </IonChip>
              </>
            ) : null}

          </IonCardContent>
        </IonCard>
      </div>


      <div className="ion-padding">
        {activeSegment === 'camas' && <SegmentMonitoreoCamas />}
        {activeSegment === 'cuadros' && <SegmentMonitoreoCuadros />}
        {activeSegment === 'diseases' && <SegmentMonitoreoDiseases mode='camas'/>}
        {activeSegment === 'options' && <SegmentMonitoreoOptions />}
      </div>
    </div>
  );
}

export default MonitoreoC;
