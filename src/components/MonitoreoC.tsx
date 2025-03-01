import { IonHeader, IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Bloque } from '../contexts/BloqueInfoContext';
import SegmentMonitoreoCamas from './SegmentMonitoreoCamas';
import SegmentMonitoreoBloques from './SegmentMonitoreoBloques';

const MonitoreoC = () => {
  const [selectedBloque, setSelectedBloque] = useState<Bloque>();



 

  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonSegment value="bloques">
            <IonSegmentButton value="bloques" contentId="bloques">
              <IonLabel>Bloques</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="camas" contentId="camas">
              <IonLabel>Camas</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <div className="ion-padding">
        <IonSegmentView>
          <IonSegmentContent id="bloques">
           <SegmentMonitoreoBloques
           setSelectedBloque={setSelectedBloque}
           />
          </IonSegmentContent>
          <IonSegmentContent id="camas">
            <SegmentMonitoreoCamas
            selectedBloque={selectedBloque}
            />
          </IonSegmentContent>
          {/* <IonSegmentContent id="third">Third</IonSegmentContent> */}
        </IonSegmentView>




      </div>
    </div>
  );
}

export default MonitoreoC;