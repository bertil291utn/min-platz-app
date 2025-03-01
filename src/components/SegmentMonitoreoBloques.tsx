import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonLabel } from '@ionic/react';
import { Bloque, useBloqueInfo } from '../contexts/BloqueInfoContext';
import { useSelectedBloque } from '../contexts/SelectedBloqueContext';

const SegmentMonitoreoBloques = () => {
  const { selectedBloque, setSelectedBloque } = useSelectedBloque();
  const { activeBloques } = useBloqueInfo()
  return (
    <>
      <p>{selectedBloque ? 'El bloque seleccionado es' : 'Seleccione un bloque'}</p>
      <h1>{selectedBloque ? `${selectedBloque.name}` : ''}</h1>
      {activeBloques.map((bloque: Bloque) => (
        <IonCol size="6" key={bloque.id}>
          <IonCard onClick={() => setSelectedBloque(bloque)} color={selectedBloque?.id == bloque.id ? 'primary' : ''}>
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