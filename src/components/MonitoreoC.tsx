import { IonHeader, IonLabel, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react';
import { MonitoringBloqueProvider, useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import SegmentMonitoreoCamas from './SegmentMonitoreoCamas';
import SegmentMonitoreoBloques from './SegmentMonitoreoBloques';
import { SegmentBloque } from '../interfaces/Bloque';

const MonitoreoContent = () => {
  const { selectedBloque, activeSegment, setActiveSegment } = useMonitoringBloque();


  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonSegment value={activeSegment} onIonChange={e => setActiveSegment(e.detail.value as SegmentBloque)}>
            <IonSegmentButton value="bloques">
              <IonLabel>Bloques</IonLabel>
            </IonSegmentButton>
            {selectedBloque && <IonSegmentButton value="camas">
              <IonLabel>Camas</IonLabel>
            </IonSegmentButton>}
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <div className="ion-padding">
        {activeSegment === 'bloques' && <SegmentMonitoreoBloques />}
        {activeSegment === 'camas' && <SegmentMonitoreoCamas />}
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