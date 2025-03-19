import ReturnButtonC from './ReturnButtonC';
import { IonCard, IonCardHeader, IonCardTitle, IonTextarea, IonLabel, IonButton, IonToast, IonSpinner } from '@ionic/react';
import { useState, useEffect } from 'react';
import LabelMonitoring from './LabelMonitoring';
import { CuadroMonitored } from '../interfaces/Monitoring';
import { sleep } from '../helpers/regularHelper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveSegment, setIsToastSavedOpen, setSelectedDiseases, setSelectedWeek, updateMonitoringData } from '../store/slices/monitoringBloqueSlice';

const SegmentMonitoreoOptions = () => {
  const [selectedAcarosLevel, setSelectedAcarosLevel] = useState<number>(2);
  const [notes, setNotes] = useState<string>('');
  const [showTextarea, setShowTextarea] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const selectedDiseases = useAppSelector(state => state.monitoringBloque.selectedDiseases);
  const selectedCuadro = useAppSelector(state => state.monitoringBloque.selectedCuadro);
  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);
  const selectedCama = useAppSelector(state => state.monitoringBloque.selectedCama);
  const selectedWeek = useAppSelector(state => state.monitoringBloque.selectedWeek);
  const selectedCuadros = useAppSelector(state => state.monitoringBloque.selectedCuadros);
  const loading = useAppSelector(state => state.monitoringBloque.loading);
  const error = useAppSelector(state => state.monitoringBloque.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedCuadros.length == 0) return
    const cuadroIndex = selectedCuadros?.findIndex(c => c.id == selectedCuadro)
    if (cuadroIndex == -1) return;
    const cuadro = selectedCuadros[cuadroIndex]
    setNotes(cuadro?.notes as string)
    setShowTextarea(!!cuadro?.notes)
    const acaros = cuadro.diseases.find(c => c.folderName == 'acaros')
    setSelectedAcarosLevel(acaros?.tercio as number)

  }, [])



  const handleSubmitCuadro = async () => {
    const newCuadro: CuadroMonitored = {
      id: selectedCuadro || 1,
      name: `Cuadro ${selectedCuadro}`,
      diseases: selectedDiseases.map(disease => ({
        ...disease,
        tercio: disease.folderName === 'acaros' ? selectedAcarosLevel : 0
      })),
      notes: notes || undefined
    };

    try {
      await dispatch(updateMonitoringData({
        bloqueId: selectedBloque?.id as number,
        camaId: selectedCama,
        newCuadro,
        customWeek: selectedWeek as number
      })).unwrap();

      // Only proceed if the update was successful
      dispatch(setActiveSegment('camas'));
      dispatch(setSelectedDiseases([]));
      dispatch(setSelectedWeek(undefined));
      // No need to manually set IsToastSavedOpen as it's handled in the reducer
    } catch (error) {
      console.error('Failed to update monitoring data:', error);
    }
  }

  return (
    <>
      <ReturnButtonC
        segmentReturn={'diseases'}
      />


      {/* content */}
      <div style={{ margin: '1rem 0' }}>
        {
          selectedDiseases.some((diseaseArr) => diseaseArr.folderName === 'acaros') &&
          <>
            <IonLabel>Seleccione el tercio donde se encuentra los acaros</IonLabel>
            <br />
            <br />
            {[3, 2, 1].map((level) => (
              <IonCard
                onClick={() => setSelectedAcarosLevel(level)}
                color={selectedAcarosLevel === level ? 'medium' : ''}
                button={true}
                key={level}
              >
                <IonCardHeader>
                  <IonCardTitle>Tercio {level}</IonCardTitle>
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
              {`${disease.name} ${disease.folderName == 'acaros' ? `(tercio ${selectedAcarosLevel})` : ''}`}
            </li>
          )}
        </ul>
        <IonButton expand="block" onClick={handleSubmitCuadro} disabled={loading}>
          {!loading ?
            <IonLabel>
              guardar enfermedad{selectedDiseases.length > 1 ? 'es' : ''}
            </IonLabel>
            :
            <>
              <IonLabel>guardando</IonLabel><IonSpinner name="dots"></IonSpinner>
            </>
          }
        </IonButton>
        {error && (
          <div style={{ color: 'red', marginTop: '1rem' }}>
            {error}
          </div>
        )}
      </div>

    </>
  );
}

export default SegmentMonitoreoOptions;