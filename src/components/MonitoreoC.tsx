import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle, removeCircle } from 'ionicons/icons';
import { useState } from 'react';
import { NUMERO_MAX, NUMERO_MIN } from '../helpers/bloquesConstant';
import { Bloque, useBloqueInfo } from '../contexts/BloqueInfoContext';
import { getSpanishOrdinal } from '../helpers/viewHelper';
import SegmentMonitoreoCamas from './SegmentMonitoreoCamas';

const MonitoreoC = () => {
  const [selectedBloque, setSelectedBloque] = useState<Bloque>();

  const { activeBloques } = useBloqueInfo()

 

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
            <p>Seleccione un bloque</p>
            {activeBloques.map((bloque: Bloque) => (
              <IonCol size="6" key={bloque.id}>
                <IonCard onClick={() => setSelectedBloque(bloque)}>
                  <IonCardHeader>
                    <IonCardTitle>{bloque.name}</IonCardTitle>
                    <IonLabel>{bloque.numCamas} camas</IonLabel>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
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