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

const MonitoreoC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMonitoredBloques());
  }, [dispatch]);

  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);
  const activeSegment = useAppSelector(state => state.monitoringBloque.activeSegment);
  const selectedCuadro = useAppSelector(state => state.monitoringBloque.selectedCuadro);
  const selectedDiseases = useAppSelector(state => state.monitoringBloque.selectedDiseases);

  const handleSegmentChange = (value: string) => {
    dispatch(setActiveSegment(value as SegmentBloque));
  };

  return (
    <div>
      <IonCard>
        <IonCardContent>
            <IonChip
             
              color="secondary"
              onClick={() => {
                dispatch(setActiveSegment('camas'));
              }}
            >
              <IonIcon icon={homeOutline} />
              <IonLabel></IonLabel>
            </IonChip>

            {selectedBloque && (
              <>
                <IonIcon icon="chevron-forward-outline" />
                <IonChip color="secondary">
                  <IonLabel>{selectedBloque.name}</IonLabel>
                </IonChip>
              </>
            )}

            {selectedCuadro && (
              <>
                <IonIcon icon="chevron-forward-outline" />
                <IonChip color="secondary">
                  <IonLabel>{`Cuadro ${selectedCuadro}`}</IonLabel>
                </IonChip>
              </>
            )}

            {selectedDiseases.length > 0 && (
              <>
                <IonIcon icon="chevron-forward-outline" />
                <IonChip color="secondary">
                  <IonLabel>Enfermedades</IonLabel>
                </IonChip>
              </>
            )}
        </IonCardContent>
      </IonCard>

      <div className="ion-padding">
        {activeSegment === 'camas' && <SegmentMonitoreoCamas />}
        {activeSegment === 'diseases' && <SegmentMonitoreoDiseases />}
        {activeSegment === 'options' && <SegmentMonitoreoOptions />}

        {/* {activeSegment === 'placas' && <MonitoreoPlacas />}
        {activeSegment === 'mallas' && <MonitoreoMallas />} */}
      </div>
    </div>
  );
}

export default MonitoreoC;
