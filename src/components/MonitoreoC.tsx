import { IonHeader, IonLabel, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMonitoredBloques, setActiveSegment } from '../store/slices/monitoringBloqueSlice';
import SegmentMonitoreoCamas from './SegmentMonitoreoCamas';
import { SegmentBloque } from '../interfaces/Bloque';
import SegmentMonitoreoDiseases from './SegmentMonitoreoDiseases';
import SegmentMonitoreoOptions from './SegmentMonitoreoOptions';
import { useEffect } from 'react';
import BloqueSelectionScreen from './BloqueSelectionScreen';
import MonitoringOptionsScreen from './MonitoringOptionsScreen';
import MonitoreoPlacas from './MonitoreoPlacas';
import MonitoreoMallas from './MonitoreoMallas';

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
      <IonHeader>
        <IonToolbar>
          <IonSegment
            value={activeSegment}
            onIonChange={e => handleSegmentChange(e.detail.value as string)}
            scrollable
          >
            <IonSegmentButton value="bloques">
              <IonLabel>Bloques</IonLabel>
            </IonSegmentButton>
            {selectedBloque && <IonSegmentButton value="monitoring-options">
              <IonLabel>Opciones</IonLabel>
            </IonSegmentButton>}
            {activeSegment === 'camas' && <IonSegmentButton value="camas">
              <IonLabel>Camas</IonLabel>
            </IonSegmentButton>}
            {selectedCuadro && <IonSegmentButton value="diseases">
              <IonLabel>Enfermedad</IonLabel>
            </IonSegmentButton>}
            {selectedDiseases.length > 0 && <IonSegmentButton value="options">
              <IonLabel>Opciones</IonLabel>
            </IonSegmentButton>}
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <div className="ion-padding">
        {activeSegment === 'bloques' && <BloqueSelectionScreen />}
        {activeSegment === 'monitoring-options' && <MonitoringOptionsScreen />}
        {activeSegment === 'camas' && <SegmentMonitoreoCamas />}
        {activeSegment === 'diseases' && <SegmentMonitoreoDiseases />}
        {activeSegment === 'options' && <SegmentMonitoreoOptions />}
        {activeSegment === 'placas' && <MonitoreoPlacas />}
        {activeSegment === 'mallas' && <MonitoreoMallas />}
      </div>
    </div>
  );
}

export default MonitoreoC;
