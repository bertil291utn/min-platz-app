import ReturnButtonC from './ReturnButtonC';
import { IonCard, IonCardHeader, IonCardTitle, IonTextarea, IonLabel, IonButton } from '@ionic/react';
import { useState } from 'react';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import LabelMonitoring from './LabelMonitoring';

const SegmentMonitoreoOptions = () => {
  const [selectedAcarosLevel, setSelectedAcarosLevel] = useState<number>(2);
  const [notes, setNotes] = useState<string>('');
  const { selectedDiseases, selectedCuadro, setActiveSegment } = useMonitoringBloque();

  const handleSubmitCuadro = () => {

  }


  return (
    <div>
      <ReturnButtonC
        segmentReturn={'diseases'}
      />


      <LabelMonitoring />
      {/* content */}
      <div style={{ margin: '1rem 0' }}>
        {
          selectedDiseases.some((diseaseArr) => diseaseArr.folderName === 'acaros') &&
          <>
            <IonLabel>Seleccione el nivel donde se encuentra los acaros</IonLabel>
            <br />
            <br />
            {[1, 2, 3].map((level) => (
              <IonCard
                onClick={() => setSelectedAcarosLevel(level)}
                color={selectedAcarosLevel === level ? 'medium' : ''}
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
        <br />

        <IonLabel>Vas a guardar estas enfermedades:</IonLabel>
        <ul onClick={() => setActiveSegment('diseases')}>
          {selectedDiseases.map((disease) =>
            <li>{`${disease.name} ${disease.folderName == 'acaros' ? 'nivel ' + selectedAcarosLevel : ''}`}</li>
          )}
        </ul>
        <IonButton expand="block" onClick={handleSubmitCuadro}>
          guardar enfermedad{selectedDiseases.length > 1 ? 'es' : ''} cuadro #{selectedCuadro}
        </IonButton>
      </div>
    </div>
  );
}

export default SegmentMonitoreoOptions;