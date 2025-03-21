import { IonCard, IonCardContent, IonChip, IonIcon, IonLabel, IonButton, IonTextarea, IonToast, IonSpinner, IonSelect, IonSelectOption, IonCardHeader, IonTitle } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveSegment, setSelectedType, setSelectedPlacaNumber, setSelectedDisease, setNotes, updatePlacaMonitoring, resetForm, setSelectedWeek, setCountDisease } from '../store/slices/placasMonitoringSlice';
import { DISEASES } from '../helpers/diseases';
import { addCircle, arrowBack, removeCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import SegmentMonitoreoBloques from './SegmentMonitoreoBloques';
import { CURRENT_WEEK_NUMBER } from '../helpers/regularHelper';
import SegmentMonitoreoDiseases from './SegmentMonitoreoDiseases';
import { PlacasSegment } from '../interfaces/PlacaMonitoring';
import { Disease } from '../interfaces/Diseases';

const MonitoreoPlacas = () => {
  const [showNumSemana, setShowNumSemana] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    activeSegment,
    selectedBloque,
    selectedType,
    selectedPlacaNumber,
    selectedDisease,
    selectedWeek,
    countDisease,
    notes,
    loading,
    isToastSavedOpen
  } = useAppSelector(state => state.placasMonitoring);

  useEffect(()=>{
    dispatch(setCountDisease(1))
  },[]);

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
      countDisease,
      notes
    }));

    dispatch(resetForm());
    dispatch(setActiveSegment('diseases'));
  };

  const handleWeekSelect = (value: number) => {
    dispatch(setSelectedWeek(value));
  };

  const handleDiseaseSelect = (disease: Disease) => {
    dispatch(setSelectedDisease(disease));
    dispatch(setActiveSegment('details'));
  };

  const renderBreadcrumbs = () => selectedBloque &&
    (<IonCard>
      <IonCardContent>
        <IonChip color="secondary"
          onClick={() => {
            dispatch(setActiveSegment('bloques'));
            dispatch(setSelectedType(null));
            dispatch(setSelectedPlacaNumber(null));
            dispatch(setSelectedDisease(null));
            dispatch(setNotes(''));
            
          }}
        >
          <IonLabel>{`Semana ${selectedWeek || CURRENT_WEEK_NUMBER}`}</IonLabel>
        </IonChip>

        <IonChip color="secondary" onClick={() => {
          dispatch(setActiveSegment('bloques'))
          dispatch(setSelectedType(null));
          dispatch(setSelectedPlacaNumber(null));
          dispatch(setSelectedDisease(null));
          dispatch(setNotes(''));
        }}>
          <IonLabel>{selectedBloque.name}</IonLabel>
        </IonChip>
        {selectedType && (
          <IonChip color="secondary" onClick={() => 
          {
            dispatch(setActiveSegment('type'))
            dispatch(setSelectedPlacaNumber(null));
            dispatch(setSelectedDisease(null));
            dispatch(setNotes(''));
          }
          }>
            <IonLabel>Placas {selectedType}s</IonLabel>
          </IonChip>
        )}
        {selectedPlacaNumber && (
          <IonChip color="secondary" onClick={() => {
            
            dispatch(setActiveSegment('number'))
            dispatch(setSelectedDisease(null));
            dispatch(setNotes(''));
          }}>
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
        );
      case 'type':
        return (
          <div className="ion-padding">
            <ReturnButtonPlacas segmentReturn="bloques" />

            <IonButton
              fill="outline"
              expand="block"
              onClick={() => setShowNumSemana(!showNumSemana)}
            >
              {showNumSemana ? 'Ocultar semana' : 'mostrar semana'}
            </IonButton>

            {showNumSemana && (
              <div style={{ margin: '2rem 0' }}>
                <IonSelect
                  label="Seleccione semana"
                  labelPlacement="floating"
                  fill="outline"
                  onIonChange={(e) => handleWeekSelect(e.detail.value)}
                  value={selectedWeek || CURRENT_WEEK_NUMBER}
                >
                  {Array.from({ length: CURRENT_WEEK_NUMBER }, (_, index) => (
                    <IonSelectOption key={index + 1} value={index + 1}>
                      Semana {index + 1}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </div>
            )}
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
            <SegmentMonitoreoDiseases
              onDiseaseSelect={handleDiseaseSelect}
              mode="placas"
            />
          </div>
        );
      case 'details':
        return (
          <div className="ion-padding">
            <ReturnButtonPlacas segmentReturn="diseases" />
            <div style={{ margin: '1.5rem 0' }}>
              <IonLabel>Seleccione cantidad de {selectedDisease?.name} encontrados</IonLabel>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
              <IonButton onClick={() => dispatch(setCountDisease(Math.max(0, countDisease - 1)))}>
                <IonIcon icon={removeCircle} />
              </IonButton>
              <IonLabel>{countDisease}</IonLabel>
              <IonButton onClick={() => dispatch(setCountDisease(countDisease + 1))}>
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