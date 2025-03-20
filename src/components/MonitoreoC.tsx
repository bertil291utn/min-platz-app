import { IonCard, IonCardContent, IonChip, IonIcon, IonLabel } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMonitoredBloques, setActiveSegment } from '../store/slices/monitoringBloqueSlice';
import SegmentMonitoreoCamas from './SegmentMonitoreoCamas';
import { SegmentBloque } from '../interfaces/Bloque';
import SegmentMonitoreoDiseases from './SegmentMonitoreoDiseases';
import SegmentMonitoreoOptions from './SegmentMonitoreoOptions';
import { useEffect } from 'react';
import MonitoreoPlacas from './MonitoreoPlacas';
import MonitoreoMallas from './MonitoreoMallas';
import { homeOutline } from 'ionicons/icons';
import SegmentMonitoreoCuadros from './SegmentMonitoreoCuadros';
import SegmentMonitoreoBloques from './SegmentMonitoreoBloques';
import { CURRENT_DATE_UTC5, CURRENT_WEEK_NUMBER, getWeekNumber } from '../helpers/regularHelper';

const MonitoreoC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMonitoredBloques());
  }, [dispatch]);

  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);
  const activeSegment = useAppSelector(state => state.monitoringBloque.activeSegment);
  const selectedCama = useAppSelector(state => state.monitoringBloque.selectedCama);
  const selectedCuadro = useAppSelector(state => state.monitoringBloque.selectedCuadro);
  const selectedWeek = useAppSelector(state => state.monitoringBloque.selectedWeek);
  const selectedDiseases = useAppSelector(state => state.monitoringBloque.selectedDiseases);

  const handleSegmentChange = (value: string) => {
    dispatch(setActiveSegment(value as SegmentBloque));
  };

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
        {activeSegment === 'diseases' && <SegmentMonitoreoDiseases />}
        {activeSegment === 'options' && <SegmentMonitoreoOptions />}


      </div>
    </div>
  );
}

export default MonitoreoC;
