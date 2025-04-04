import {
  IonCard, IonCardContent, IonChip, 
  IonLabel, 
} from '@ionic/react';
import { 
  useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { CURRENT_WEEK_NUMBER } from '../helpers/regularHelper';
import {
  setActiveSegment, 
  fetchMonitoredBloques
} from '../store/slices/monitoringBloqueSlice';
import SegmentMonitoreoBloques from './SegmentMonitoreoBloques';
import SegmentMonitoreoDiseases from './SegmentMonitoreoDiseases';
import SegmentMonitoreoCamas from './SegmentMonitoreoCamas';
import SegmentMonitoreoOptions from './SegmentMonitoreoOptions';
import SegmentMonitoreoCuadros from './SegmentMonitoreoCuadros';

const MonitoreoC = () => {
  const dispatch = useAppDispatch();
  const {
    activeSegment,
    selectedBloque,
    selectedCuadro,
    selectedCama,
  } = useAppSelector(state => state.monitoringBloque);

  const selectedWeek = useAppSelector(state => state.monitoringBloque.selectedWeek);

  useEffect(() => {
    dispatch(fetchMonitoredBloques());
  }, [dispatch]);


  return (
    <div>
      <div className="sticky-header" style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
        <IonCard>
          <IonCardContent>

            {selectedBloque ? (
              <>
                <IonChip color="secondary"
                  onClick={() => {
                    dispatch(setActiveSegment('bloques'));
                  }}
                >
                  <IonLabel>{selectedBloque.name}</IonLabel>
                </IonChip>
              </>
            ) : null}

            <IonChip color="secondary"
              onClick={() => {
                dispatch(setActiveSegment('camas'));
              }}
            >
              <IonLabel>{`Semana ${selectedWeek || CURRENT_WEEK_NUMBER}`}</IonLabel>
            </IonChip>

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
        {activeSegment === 'bloques' && <SegmentMonitoreoBloques />}
        {activeSegment === 'camas' && <SegmentMonitoreoCamas />}
        {activeSegment === 'cuadros' && <SegmentMonitoreoCuadros />}
        {activeSegment === 'diseases' && <SegmentMonitoreoDiseases mode='camas'/>}
        {activeSegment === 'options' && <SegmentMonitoreoOptions />}


      </div>
    </div>
  );
}

export default MonitoreoC;
