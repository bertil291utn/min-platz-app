import { IonButton, IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { SegmentBloque } from '../interfaces/Bloque';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';

const ReturnButtonC = (
  { segmentReturn }: {
    segmentReturn: SegmentBloque
  }

) => {
  const {
    setActiveSegment
  } = useMonitoringBloque();

  
  const handleArrowBack = (segmentReturn: SegmentBloque) => () => {
    setActiveSegment(segmentReturn)
  }

  return (

    <IonButton fill="clear" onClick={handleArrowBack(segmentReturn)}>
      <IonIcon slot="start" icon={arrowBack}></IonIcon>
      regresar
    </IonButton>
  );
}

export default ReturnButtonC;