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

const MonitoreoC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMonitoredBloques());
  }, [dispatch]);

  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);
  const activeSegment = useAppSelector(state => state.monitoringBloque.activeSegment);
  const selectedCama = useAppSelector(state => state.monitoringBloque.selectedCama);
  const selectedCuadro = useAppSelector(state => state.monitoringBloque.selectedCuadro);
  const selectedDiseases = useAppSelector(state => state.monitoringBloque.selectedDiseases);

  const handleSegmentChange = (value: string) => {
    dispatch(setActiveSegment(value as SegmentBloque));
  };

  return (
    <div>
      <div className="sticky-header" style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
        <IonCard>
          <IonCardContent>
            <IonChip

              color="secondary"
              onClick={() => {
                dispatch(setActiveSegment('bloques'));
              }}
            >
              <IonIcon size='large' icon={homeOutline} />
              <IonLabel></IonLabel>
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
