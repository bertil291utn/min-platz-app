import ReturnButtonC from './ReturnButtonC';
import { IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonTextarea, IonGrid, IonRow, IonCol, IonLabel } from '@ionic/react';
import { useState } from 'react';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';

const SegmentMonitoreoOptions = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(2);
  const [notes, setNotes] = useState<string>('');
  const { selectedDisease } = useMonitoringBloque();
  return (
    <div>
      <ReturnButtonC
        segmentReturn={'diseases'}
      />

      {/* content */}
      <div style={{ margin: '1rem 0' }}>
        {
          selectedDisease?.folderName === 'acaros' &&
          <>
            <IonLabel>Seleccione el nivel donde se encuentra los acaros</IonLabel>
            <br />
            <br />
            {[1, 2, 3].map((level: any) => (
              <IonCard
                onClick={() => setSelectedLevel(level)}
                color={selectedLevel === level ? 'primary' : ''}
                button={true}
              >
                <IonCardHeader>
                  <IonCardTitle>Nivel {level}</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            ))}
          </>
        }
        <br />
        <IonTextarea
          fill='outline'
          placeholder="Notas adicionales"
          value={notes}
          onIonChange={e => setNotes(e.detail.value!)}
          rows={4}
          autoGrow={true}
        ></IonTextarea>
      </div>
    </div>
  );
}

export default SegmentMonitoreoOptions;