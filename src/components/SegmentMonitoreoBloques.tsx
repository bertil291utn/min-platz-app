import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonLabel } from '@ionic/react';
import { useBloqueInfo } from '../contexts/BloqueInfoContext';
import { Bloque } from '../interfaces/Bloque';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';

const SegmentMonitoreoBloques = () => {
  const { selectedBloque, setSelectedBloque, setActiveSegment } = useMonitoringBloque();
  const { activeBloques } = useBloqueInfo();

  const handleChangeSegment = (bloque: Bloque) => () => {
    setSelectedBloque(bloque);
    setActiveSegment('camas');
  }

  return (
    <>
      <p>{selectedBloque ? 'El bloque seleccionado es' : 'Seleccione un bloque'}</p>
      <h1>{selectedBloque ? `${selectedBloque.name}` : ''}</h1>
      <br />
      {activeBloques.map((bloque: Bloque) => (
        <IonCard key={bloque.id} onClick={handleChangeSegment(bloque)} color={selectedBloque?.id == bloque.id ? 'primary' : ''}>
          <IonCardHeader>
            <IonCardTitle>{bloque.name}</IonCardTitle>
            <IonLabel>{bloque.numCamas} camas</IonLabel>
          </IonCardHeader>
        </IonCard>
      ))}
    </>

  );
}

export default SegmentMonitoreoBloques;