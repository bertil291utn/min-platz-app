import { IonCard, IonCardHeader, IonCardTitle, IonLabel } from '@ionic/react';
import { Bloque } from '../interfaces/Bloque';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectActiveBloques } from '../store/slices/bloqueInfoSlice';
import { setSelectedDiseases, setSelectedCuadros, setSelectedCuadro, setSelectedCama, setSelectedBloque, setActiveSegment } from '../store/slices/monitoringBloqueSlice';

const SegmentMonitoreoBloques = () => {

  const activeBloques = useAppSelector(selectActiveBloques);
  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);
  const dispatch = useAppDispatch();

  const handleChangeSegment = (bloque: Bloque) => () => {
    dispatch(setSelectedDiseases([]));
    dispatch(setSelectedCuadros([]));
    dispatch(setSelectedCuadro(undefined));
    dispatch(setSelectedCama(1))
    dispatch(setSelectedBloque(bloque));
    dispatch(setActiveSegment('camas'));
  }

  return (
    <>
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