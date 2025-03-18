import { IonHeader, IonLabel, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react';
import { MonitoringBloqueProvider, useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import SegmentMonitoreoCamas from './SegmentMonitoreoCamas';
import { SegmentBloque } from '../interfaces/Bloque';
import SegmentMonitoreoDiseases from './SegmentMonitoreoDiseases';
import SegmentMonitoreoOptions from './SegmentMonitoreoOptions';
import { useEffect } from 'react';
import BloqueSelectionScreen from './BloqueSelectionScreen';
import MonitoringOptionsScreen from './MonitoringOptionsScreen';
import MonitoreoPlacas from './MonitoreoPlacas';
import MonitoreoMallas from './MonitoreoMallas';

const MonitoreoContent = () => {
  const { getMonitoredBloques } = useMonitoringBloque();
  useEffect(() => {
    getMonitoredBloques();
  }, [])

  const { selectedBloque, activeSegment, setActiveSegment, selectedCuadro, selectedDiseases } = useMonitoringBloque();

  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonSegment
            value={activeSegment}
            onIonChange={e => setActiveSegment(e.detail.value as SegmentBloque)}
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

const MonitoreoC = () => {
  return (
    <MonitoringBloqueProvider>
      <MonitoreoContent />
    </MonitoringBloqueProvider>
  );
}

export default MonitoreoC;