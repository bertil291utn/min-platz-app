import { IonCard, IonCardContent, IonChip, IonIcon, IonLabel, IonButton, IonTextarea, IonToast, IonSpinner } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveSegment, setSelectedType, setSelectedPlacaNumber, setSelectedDisease, setCount, setNotes, updatePlacaMonitoring, resetForm } from '../store/slices/placasMonitoringSlice';
import { DISEASES } from '../helpers/diseases';
import { addCircle, removeCircle } from 'ionicons/icons';
import { useEffect } from 'react';
import SegmentMonitoreoBloques from './SegmentMonitoreoBloques';
import { CURRENT_WEEK_NUMBER } from '../helpers/regularHelper';

const MonitoreoPlacas = () => {
  const dispatch = useAppDispatch();
  const {
    activeSegment,
    selectedBloque,
    selectedType,
    selectedPlacaNumber,
    selectedDisease,
    selectedWeek,
    count,
    notes,
    loading,
    isToastSavedOpen
  } = useAppSelector(state => state.placasMonitoring);

  const sortedDiseases = [...DISEASES].sort((a, b) => {
    if (a.name === 'Thrips' || a.name === 'Mosca Blanca') return -1;
    if (b.name === 'Thrips' || b.name === 'Mosca Blanca') return 1;
    return 0;
  });

  const handleSave = async () => {
    if (!selectedBloque || !selectedType || !selectedPlacaNumber || !selectedDisease) return;

    await dispatch(updatePlacaMonitoring({
      bloqueId: selectedBloque.id!,
      type: selectedType,
      placaNumber: selectedPlacaNumber,
      disease: selectedDisease,
      count,
      notes
    }));

    dispatch(resetForm());
    dispatch(setActiveSegment('diseases'));
  };

  const renderBreadcrumbs = () => selectedBloque &&
    (<IonCard>
      <IonCardContent>
        <IonChip color="secondary"
          onClick={() => {
            dispatch(setActiveSegment('bloques'));
          }}
        >
          <IonLabel>{`Semana ${selectedWeek || CURRENT_WEEK_NUMBER}`}</IonLabel>
        </IonChip>

        <IonChip color="secondary" onClick={() => dispatch(setActiveSegment('bloques'))}>
          <IonLabel>{selectedBloque.name}</IonLabel>
        </IonChip>
        {selectedType && (
          <IonChip color="secondary" onClick={() => dispatch(setActiveSegment('type'))}>
            <IonLabel>Placas {selectedType}s</IonLabel>
          </IonChip>
        )}
        {selectedPlacaNumber && (
          <IonChip color="secondary" onClick={() => dispatch(setActiveSegment('number'))}>
            <IonLabel>Placa {selectedPlacaNumber}</IonLabel>
          </IonChip>
        )}
        {selectedDisease && (
          <IonChip color="secondary" onClick={() => dispatch(setActiveSegment('diseases'))}>
            <IonLabel>{selectedDisease.name}</IonLabel>
          </IonChip>
        )}
      </IonCardContent>
    </IonCard>);

  const renderContent = () => {
    switch (activeSegment) {
      case 'bloques':
        return (
          <div className='ion-padding'>
            <SegmentMonitoreoBloques />
          </div>
        )
      case 'type':
        return (
          <div>
            <IonButton expand="block" onClick={() => {
              dispatch(setSelectedType('interno'));
              dispatch(setActiveSegment('number'));
            }}>
              Placas Internas
            </IonButton>
            <IonButton expand="block" onClick={() => {
              dispatch(setSelectedType('externo'));
              dispatch(setActiveSegment('number'));
            }}>
              Placas Externas
            </IonButton>
          </div>
        );
      case 'number':
        return (
          <div className="ion-padding">
            {Array.from({
              length: selectedType === 'interno' ?
                selectedBloque?.numPlacasInternas || 0 :
                selectedBloque?.numPlacasExternas || 0
            }).map((_, index) => (
              <IonButton
                key={index}
                fill={selectedPlacaNumber === index + 1 ? 'solid' : 'outline'}
                onClick={() => {
                  dispatch(setSelectedPlacaNumber(index + 1));
                  dispatch(setActiveSegment('diseases'));
                }}
              >
                Placa {index + 1}
              </IonButton>
            ))}
          </div>
        );
      case 'diseases':
        return (
          <div className="ion-padding">
            {sortedDiseases.map(disease => (
              <IonCard
                key={disease.id}
                onClick={() => {
                  dispatch(setSelectedDisease(disease));
                  dispatch(setActiveSegment('details'));
                }}
              >
                <IonCardContent>
                  <IonLabel>{disease.name}</IonLabel>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        );
      case 'details':
        return (
          <div className="ion-padding">
            <IonLabel>Seleccione cantidad de {selectedDisease?.name} encontrados</IonLabel>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
              <IonButton onClick={() => dispatch(setCount(Math.max(0, count - 1)))}>
                <IonIcon icon={removeCircle} />
              </IonButton>
              <IonLabel>{count}</IonLabel>
              <IonButton onClick={() => dispatch(setCount(count + 1))}>
                <IonIcon icon={addCircle} />
              </IonButton>
            </div>


            <div style={{ margin: '2rem 0' }}>
              <IonTextarea
                label="Notas adicionales"
                labelPlacement="floating"
                fill='outline'
                value={notes}
                onIonInput={e => dispatch(setNotes(e.detail.value!))}
                rows={4}
                name='notes'
              />
            </div>


            <IonButton expand="block" onClick={handleSave} disabled={loading}>
              {loading ? <IonSpinner /> : 'Guardar'}
            </IonButton>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderBreadcrumbs()}
      {renderContent()}
      <IonToast
        isOpen={isToastSavedOpen}
        message={`Monitoreo de placa ${selectedPlacaNumber} guardado`}
        duration={3000}
      />
    </div>
  );
};

export default MonitoreoPlacas;