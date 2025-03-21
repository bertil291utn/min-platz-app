import { useState } from 'react';
import { DISEASES } from '../helpers/diseases';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonItemDivider } from '@ionic/react';
import { Disease } from '../interfaces/Diseases';
import DiseaseImagesModal from './DiseaseImagesModal';
import { arrowForward } from 'ionicons/icons';
import ReturnButtonC from './ReturnButtonC';
import LabelMonitoring from './LabelMonitoring';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveSegment, setSelectedDiseases } from '../store/slices/monitoringBloqueSlice';
import { ReturnButtonPlacas } from './MonitoreoPlacas';
import { setActiveSegment as setActiveSegmentPlacas, setSelectedDiseases as setSelectedDiseasesPlacas } from '../store/slices/placasMonitoringSlice';

interface SegmentMonitoreoDiseaseProps {
  onDiseaseSelect?: (disease: Disease) => void;
  mode?: 'camas' | 'placas';
}

const SegmentMonitoreoDiseases: React.FC<SegmentMonitoreoDiseaseProps> = ({
  onDiseaseSelect,
  mode = 'camas'
}) => {
  const [diseasesArr] = useState(DISEASES);
  const dispatch = useAppDispatch();
  const selectedDiseases = useAppSelector(state => state.monitoringBloque.selectedDiseases);
  const selectedDiseasesPlacas = useAppSelector(state => state.placasMonitoring.selectedDiseases);
  const [showModalDisease, setShowModalDisease] = useState<Disease | boolean>(false);
  const user = useAppSelector((state) => state.userLogged.user);

  const handleSelectDisease = (disease: Disease) => () => {
    if (mode === 'placas') {
      const setDisease = () => {
        const prev = [...selectedDiseasesPlacas];
        const isSelected = prev.some(d => d.id === disease.id);
        if (isSelected) {
          return prev.filter(d => d.id !== disease.id);
        } else {
          return [...prev, { ...disease, countDisease: 1 }];
        }
      };
      dispatch(setSelectedDiseasesPlacas(setDisease()));
      // onDiseaseSelect(disease);
      return;
    }

    // camas monitoring logic
    const setDisease = () => {
      const prev = [...selectedDiseases];
      const isSelected = prev.some(d => d.id === disease.id);
      if (isSelected) {
        return prev.filter(d => d.id !== disease.id);
      } else {
        return [...prev, disease];
      }
    };
    dispatch(setSelectedDiseases(setDisease()));
  };

  const handleViewDisease = (disease: Disease) => () => {
    setShowModalDisease(disease);
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        padding: '1rem',
        zIndex: 1000,
        borderTop: '1px solid #ccc'
      }}>
        {mode === 'camas' && <ReturnButtonC
          segmentReturn={'cuadros'}
        />}

        {mode === 'placas' && <ReturnButtonPlacas segmentReturn="number" />}

        {(selectedDiseases.length > 0 || selectedDiseasesPlacas.length > 0) &&
          <IonButton fill="clear" onClick={() => {
            mode === 'camas' && dispatch(setActiveSegment('options'))
            mode === 'placas' && dispatch(setActiveSegmentPlacas('details'))

          }}>
            <IonIcon slot="end" icon={arrowForward}></IonIcon>
            avanzar
          </IonButton>
        }
      </div>

      <p>Seleccione enfermedad</p>
      <br />

      <div style={{ paddingBottom: '5rem' }}>
        {diseasesArr.map((disease) => (
          user?.expert ? (
            <div key={disease.id}>
              <DiseaseCard
                disease={disease}
                handleSelectDisease={handleSelectDisease}
                selectedDiseases={mode === 'camas' ? selectedDiseases : selectedDiseasesPlacas}
              />
            </div>
          ) : (
            <IonItemDivider key={disease.id}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '1rem 0' }}>
                <DiseaseCard
                  disease={disease}
                  handleSelectDisease={handleSelectDisease}
                  selectedDiseases={mode === 'camas' ? selectedDiseases : selectedDiseasesPlacas}
                />
                <IonButton fill="clear" expand='block'
                  onClick={handleViewDisease(disease)}
                >ver como son {disease.name}?</IonButton>
              </div>
            </IonItemDivider>
          )
        ))}
      </div>

      {
        showModalDisease &&
        <DiseaseImagesModal
          isOpen={!!showModalDisease}
          onDismiss={() => setShowModalDisease(false)}
          disease={showModalDisease as Disease}
        />
      }
    </div >

  );
}

export default SegmentMonitoreoDiseases;


const DiseaseCard = ({ disease, handleSelectDisease, selectedDiseases }:
  {
    disease: Disease,
    handleSelectDisease: (disease: Disease) => () => void
    selectedDiseases: Disease[]

  }
) => {
  return (
    <IonCard onClick={handleSelectDisease(disease)}
      color={selectedDiseases.some((diseaseArr) => diseaseArr.id == disease.id) ? 'medium' : ''}
    >
      <IonCardHeader>
        <IonCardTitle>{disease.name}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}
