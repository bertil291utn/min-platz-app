import {
  IonCard, IonCardContent, IonChip, IonIcon, IonLabel, IonButton,
  IonTextarea, IonToast, IonSpinner, IonList, IonItem,
  IonCardHeader,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonAlert
} from '@ionic/react';
import { addCircle, arrowBack, removeCircle } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Disease } from '../interfaces/Diseases';
import { BloqueMonPlaca, DiseaseInPlaca, PlacasSegment } from '../interfaces/PlacaMonitoring';
import { CURRENT_WEEK_NUMBER } from '../helpers/regularHelper';
import {
  setActiveSegment, setSelectedType, setSelectedPlacaNumber,
  setSelectedDiseases, setNotes, updatePlacaMonitoring, resetForm,
  setIsEdit,
  STORE_PLACAS_MONITORED
} from '../store/slices/placasMonitoringSlice';
import SegmentMonitoreoDiseases from './SegmentMonitoreoDiseases';

const MonitoreoPlacas = () => {
  const [displayAlert, setDisplayAlert] = useState(false);
  const dispatch = useAppDispatch();

  // Get selectedBloque and selectedWeek from monitoringBloque state
  const { selectedBloque, selectedWeek } = useAppSelector(state => state.monitoringBloque);

  const {
    activeSegment,
    selectedType,
    selectedPlacaNumber,
    selectedDiseases,
    notes,
    loading,
    isToastSavedOpen,
    isEdit
  } = useAppSelector(state => state.placasMonitoring);

  // Check if this is an edit case when placa is selected
  // useEffect(() => {
  //   if (selectedBloque?.id && selectedType && selectedPlacaNumber) {
  //     const weekNumber = selectedWeek || CURRENT_WEEK_NUMBER;
  //     const existingData = localStorage.getItem(STORE_PLACAS_MONITORED);

  //     if (existingData) {
  //       const parsedData: BloqueMonPlaca[] = JSON.parse(existingData);
  //       const bloqueIndex = parsedData?.findIndex(b => 
  //         b.id === selectedBloque.id && b.weekNumber === weekNumber
  //       );

  //       if (bloqueIndex !== -1) {
  //         const placaExists = parsedData[bloqueIndex].placas.some(
  //           p => p.id === selectedPlacaNumber && p.type === selectedType
  //         );
  //         if (placaExists) {
  //           setDisplayAlert(true);
  //           dispatch(setIsEdit(true));
  //         } else {
  //           dispatch(setIsEdit(false));
  //         }
  //       } else {
  //         dispatch(setIsEdit(false));
  //       }
  //     } else {
  //       dispatch(setIsEdit(false));
  //     }
  //   }
  // }, [selectedBloque?.id, selectedType, selectedPlacaNumber, selectedWeek, dispatch]);

  const handleSave = async () => {
    if (!selectedBloque || !selectedType || !selectedPlacaNumber) return;

    await dispatch(updatePlacaMonitoring({
      bloqueId: selectedBloque.id!,
      type: selectedType,
      placaNumber: selectedPlacaNumber,
      diseases: selectedDiseases,
      notes
    }));

    dispatch(resetForm());
    dispatch(setIsEdit(false));
    dispatch(setActiveSegment('type'));
  };

  const handleUpdateDiseaseCount = (diseaseId: number, newCount: number) => {
    const updatedDiseases = selectedDiseases.map(disease =>
      disease.id === diseaseId
        ? { ...disease, countDisease: newCount }
        : disease
    );
    dispatch(setSelectedDiseases(updatedDiseases));
  };

  const handleSelectPlaca = (placaNumber: number) => {
    dispatch(setSelectedPlacaNumber(placaNumber));

    // Check existing data
    const existingData = localStorage.getItem(STORE_PLACAS_MONITORED);

    if (!existingData) {
      dispatch(setActiveSegment('diseases'));
      return;
    }

    const weekNumber = selectedWeek || CURRENT_WEEK_NUMBER;
    const parsedData: BloqueMonPlaca[] = JSON.parse(existingData);

    const bloqueIndex = parsedData?.findIndex(b =>
      b.id === selectedBloque?.id && b.weekNumber === weekNumber
    );

    if (bloqueIndex === -1) {
      dispatch(setActiveSegment('diseases'));
      return;
    }

    const bloque = parsedData[bloqueIndex];
    const placa = bloque.placas.find(p =>
      p.id === placaNumber && p.type === selectedType
    );

    if (!placa) {
      dispatch(setActiveSegment('diseases'));
      return;
    }

    // If placa exists, show alert and set existing data
    dispatch(setIsEdit(true));
    setDisplayAlert(true);

    // Set existing data for editing
    if (placa.diseases.length > 0) {
      dispatch(setSelectedDiseases(placa.diseases));
      dispatch(setNotes(placa.notes || ''));
    }
  };

  const renderDiseasesList = () => (
    <IonList>
      {selectedDiseases.map(disease => (
        <IonItem key={disease.id}>
          <IonLabel>{disease.name}</IonLabel>
          <div slot="end" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IonButton onClick={() =>
              handleUpdateDiseaseCount(disease.id, Math.max(0, disease.countDisease - 1))
            }>
              <IonIcon icon={removeCircle} />
            </IonButton>
            <IonLabel>{disease.countDisease}</IonLabel>
            <IonButton onClick={() =>
              handleUpdateDiseaseCount(disease.id, disease.countDisease + 1)
            }>
              <IonIcon icon={addCircle} />
            </IonButton>
          </div>
        </IonItem>
      ))}
    </IonList>
  );

  const renderContent = () => {
    switch (activeSegment) {
      case 'type':
        return (
          <div className="ion-padding">
            <div style={{ marginTop: '3rem' }}>
              <IonLabel>Seleccione tipo de placa</IonLabel>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <IonCard
                onClick={() => {
                  dispatch(setSelectedType('interno'));
                  dispatch(setActiveSegment('number'));
                }}
                color={selectedType === 'interno' ? 'primary' : ''}
              >
                <IonCardHeader>
                  <IonTitle>
                    Placas Internas
                  </IonTitle>
                </IonCardHeader>
              </IonCard>

              <IonCard
                onClick={() => {
                  dispatch(setSelectedType('externo'));
                  dispatch(setActiveSegment('number'));
                }}
                color={selectedType === 'externo' ? 'primary' : ''}
              >
                <IonCardHeader>
                  <IonTitle>
                    Placas Externas
                  </IonTitle>
                </IonCardHeader>
              </IonCard>
            </div>

          </div>
        );
      case 'number':
        return (
          <div className="ion-padding">
            <ReturnButtonPlacas segmentReturn="type" />
            <div style={{ margin: '1.5rem 0' }}>
              <IonLabel>Seleccione número de placa</IonLabel>
            </div>
            <div>
              {selectedBloque?.placasDetails?.filter(p => p.type == selectedType).map((_, index) => {
                const placaNumber = index + 1;
                const placaDescription = selectedBloque?.placasDetails?.find(
                  p => p.type === selectedType && p.id === `${selectedType}-${placaNumber}`
                )?.description;

                return (
                  <IonCard
                    key={index}
                    onClick={() => handleSelectPlaca(placaNumber)}
                    color={selectedPlacaNumber === placaNumber ? 'primary' : ''}
                  >
                    <IonCardHeader>
                      <IonTitle>
                        Placa {selectedType === 'interno' ? 'Interna' : 'Externa'} #{placaNumber}
                      </IonTitle>
                    </IonCardHeader>
                    {placaDescription && (
                      <IonCardContent>
                        {placaDescription}
                      </IonCardContent>
                    )}
                  </IonCard>
                );
              })}
            </div>

            <IonAlert
              header={`Esta placa #${selectedPlacaNumber} ya fue monitoreada`}
              subHeader='Monitorear otra vez?'
              isOpen={displayAlert}
              buttons={[
                {
                  text: 'No',
                  role: 'cancel',
                  handler: () => {
                    dispatch(setSelectedPlacaNumber(null));
                    dispatch(setSelectedDiseases([]));
                    setDisplayAlert(false);
                  }
                },
                {
                  text: 'Si',
                  role: 'confirm',
                  handler: () => {
                    dispatch(setActiveSegment('diseases'));
                    setDisplayAlert(false);
                  }
                }
              ]}
              onDidDismiss={() => setDisplayAlert(false)}
            />
          </div>
        );
      case 'diseases':
        return (
          <div className="ion-padding">
            <SegmentMonitoreoDiseases
              mode="placas"
            />
          </div>
        );
      case 'details':
        return (
          <div className="ion-padding">
            <ReturnButtonPlacas segmentReturn="diseases" />
            <div style={{ margin: '1.5rem 0' }}>
              <IonLabel>Cantidad de plagas encontradas {selectedDiseases.length}</IonLabel>
            </div>

            {renderDiseasesList()}

            <div style={{ margin: '2rem 0' }}>
              <IonTextarea
                label="Notas adicionales"
                labelPlacement="floating"
                fill="outline"
                value={notes}
                onIonInput={e => dispatch(setNotes(e.detail.value!))}
                rows={4}
              />
            </div>

            <IonButton expand="block" onClick={handleSave} disabled={loading}>
              {loading ? <IonSpinner /> : 'Guardar'}
            </IonButton>
          </div>
        );
      default:
        return null
    }
  };

  // Al iniciar, establecer activeSegment a 'type' si no hay uno definido
  useEffect(() => {
    if (!activeSegment || activeSegment === 'bloques') {
      dispatch(setActiveSegment('type'));
    }
  }, []);

  return (
    <>
      {selectedBloque && (
        <IonCard>
          <IonCardContent>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <IonChip color="secondary">
                <IonLabel>{`Semana ${selectedWeek || CURRENT_WEEK_NUMBER}`}</IonLabel>
              </IonChip>
              <IonChip color="secondary">
                <IonLabel>{selectedBloque.name}</IonLabel>
              </IonChip>
              {selectedType && (
                <IonChip color="secondary" onClick={() => {
                  dispatch(setActiveSegment('type'))
                  dispatch(setSelectedPlacaNumber(null));
                  dispatch(setSelectedDiseases([]));
                  dispatch(setNotes(''));
                }
                }>
                  <IonLabel>Placas {selectedType}s</IonLabel>
                </IonChip>
              )}
              {selectedPlacaNumber && (
                <IonChip color="secondary" onClick={() => {

                  dispatch(setActiveSegment('number'))
                  dispatch(setSelectedDiseases([]));
                  dispatch(setNotes(''));
                }}>
                  <IonLabel>Placa {selectedPlacaNumber}</IonLabel>
                </IonChip>
              )}
              {selectedDiseases.length > 0 &&
                <IonChip color="secondary" onClick={() => dispatch(setActiveSegment('diseases'))}>
                  <IonLabel>Diseases</IonLabel>
                </IonChip>}
            </div>
          </IonCardContent>
        </IonCard>
      )}
      {renderContent()}
      <IonToast
        isOpen={isToastSavedOpen}
        message="Monitoreo guardado exitosamente"
        duration={2000}
      />
    </>
  );
};

export default MonitoreoPlacas;

export interface ReturnButtonCProps {
  segmentReturn: PlacasSegment;
}

export const ReturnButtonPlacas: React.FC<ReturnButtonCProps> = ({ segmentReturn }) => {
  const dispatch = useAppDispatch();
  return (
    <IonButton fill="clear" onClick={() => dispatch(setActiveSegment(segmentReturn))}>
      <IonIcon slot="start" icon={arrowBack}></IonIcon>
      regresar
    </IonButton>
  );
};