import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonLabel } from '@ionic/react';
import { Bloque, useBloqueInfo } from '../contexts/BloqueInfoContext';

interface SegmentMonitoreoBloquesProps {
  setSelectedBloque: (bloque: Bloque) => void;
}

const SegmentMonitoreoBloques = ({ setSelectedBloque }: SegmentMonitoreoBloquesProps) => {
  const { activeBloques } = useBloqueInfo()
  return (
    <>
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
    </>

  );
}

export default SegmentMonitoreoBloques;