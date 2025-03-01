import { IonHeader, IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonToolbar } from '@ionic/react';
import { SelectedBloqueProvider, useSelectedBloque } from '../contexts/SelectedBloqueContext';
import SegmentMonitoreoCamas from './SegmentMonitoreoCamas';
import SegmentMonitoreoBloques from './SegmentMonitoreoBloques';

const MonitoreoContent = () => {
  const { selectedBloque } = useSelectedBloque();

  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonSegment value="bloques">
            <IonSegmentButton value="bloques" contentId="bloques">
              <IonLabel>Bloques</IonLabel>
            </IonSegmentButton>
            {selectedBloque && <IonSegmentButton value="camas" contentId="camas">
              <IonLabel>Camas</IonLabel>
            </IonSegmentButton>}
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <div className="ion-padding">
        <IonSegmentView>
          <IonSegmentContent id="bloques">
            <SegmentMonitoreoBloques />
          </IonSegmentContent>
          <IonSegmentContent id="camas">
            <SegmentMonitoreoCamas />
          </IonSegmentContent>
        </IonSegmentView>
      </div>
    </div>
  );
}

const MonitoreoC = () => {
  return (
    <SelectedBloqueProvider>
      <MonitoreoContent />
    </SelectedBloqueProvider>
  );
}

export default MonitoreoC;