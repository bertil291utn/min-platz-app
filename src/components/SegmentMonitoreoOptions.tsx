import ReturnButtonC from './ReturnButtonC';
import { IonCard, IonCardHeader, IonCardTitle, IonTextarea, IonLabel, IonButton, IonToast, IonSpinner } from '@ionic/react';
import { useState, useEffect } from 'react';
import LabelMonitoring from './LabelMonitoring';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import { CuadroMonitored } from '../interfaces/Monitoring';
import { sleep } from '../helpers/regularHelper';

const SegmentMonitoreoOptions = () => {
  const [selectedAcarosLevel, setSelectedAcarosLevel] = useState<number>(2);
  const [notes, setNotes] = useState<string>('');
  const [showTextarea, setShowTextarea] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const {
    selectedDiseases,
    selectedCuadro,
    setActiveSegment,
    selectedBloque,
    selectedCama,
    updateMonitoring,
    setSelectedDiseases,
    selectedCuadros,
    setIsToastSavedOpen
  } = useMonitoringBloque();

  useEffect(() => {
    if (selectedCuadros.length == 0) return
    const cuadroIndex = selectedCuadros?.findIndex(c => c.id == selectedCuadro)
    if (cuadroIndex == -1) return;
    const cuadro = selectedCuadros[cuadroIndex]
    setNotes(cuadro?.notes as string)
    setShowTextarea(!!cuadro?.notes)
    const acaros = cuadro.diseases.find(c => c.folderName == 'acaros')
    setSelectedAcarosLevel(acaros?.level as number)

  }, [])



  const handleSubmitCuadro = async () => {
    setLoadingForm(true)
    const newCuadro: CuadroMonitored = {
      id: selectedCuadro || 1,
      name: `Cuadro ${selectedCuadro}`,
      diseases: selectedDiseases.map(disease => (
        {
          ...disease,
          level: disease.folderName === 'acaros' ? selectedAcarosLevel : 0
        }
      )),
      notes: notes || undefined
    };

    try {
      await updateMonitoring(selectedBloque?.id as number, selectedCama, newCuadro);
      await sleep(1.5);
      setActiveSegment('camas');
      setIsToastSavedOpen(true);
      setSelectedDiseases([]);
      
    } catch (error) {
      setLoadingForm(false)
    }
    finally {
      setLoadingForm(false)
    }

  }

  return (
    <>
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
                key={level}
              >
                <IonCardHeader>
                  <IonCardTitle>Nivel {level}</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            ))}
          </>
        }
        <br />
        <IonButton
          fill="outline"
          expand="block"
          onClick={() => setShowTextarea(!showTextarea)}
        >
          {showTextarea ? 'Ocultar notas' : 'Agregar notas'}
        </IonButton>
        {showTextarea && (
          <IonTextarea
            fill='outline'
            placeholder="Notas adicionales"
            value={notes}
            onIonInput={e => setNotes(e.detail.value as string)}
            rows={4}
            autoGrow={true}
            name='notes'
          ></IonTextarea>
        )}
        <br />

        <IonLabel>Vas a guardar estas enfermedades en el cuadro #{selectedCuadro}</IonLabel>
        <ul onClick={() => setActiveSegment('diseases')}>
          {selectedDiseases.map((disease) =>
            <li key={disease.id}>
              {`${disease.name} ${disease.folderName == 'acaros' ? 'nivel ' + selectedAcarosLevel : ''}`}
            </li>
          )}
        </ul>
        <IonButton expand="block" onClick={handleSubmitCuadro} disabled={loadingForm}>
          {!loadingForm ?
            <IonLabel>
              guardar enfermedad{selectedDiseases.length > 1 ? 'es' : ''}
            </IonLabel>
            :
            <>
              <IonLabel>guardando</IonLabel><IonSpinner name="dots"></IonSpinner>
            </>
          }
        </IonButton>
      </div>
      
    </>
  );
}

export default SegmentMonitoreoOptions;