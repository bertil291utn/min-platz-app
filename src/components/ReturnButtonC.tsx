import { IonButton, IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { SegmentBloque } from '../interfaces/Bloque';
import { useAppDispatch } from '../store/hooks';
import { setActiveSegment } from '../store/slices/monitoringBloqueSlice';

const ReturnButtonC = (
  { segmentReturn }: {
    segmentReturn: SegmentBloque
  }
) => {
  const dispatch = useAppDispatch();
  
  const handleArrowBack = (segmentReturn: SegmentBloque) => () => {
    dispatch(setActiveSegment(segmentReturn));
  }

  return (
    <IonButton fill="clear" onClick={handleArrowBack(segmentReturn)}>
      <IonIcon slot="start" icon={arrowBack}></IonIcon>
      regresar
    </IonButton>
  );
}

export default ReturnButtonC;
