import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import { useState } from 'react';
import { DISEASES } from '../helpers/diseases';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonItemDivider } from '@ionic/react';
import { Disease } from '../interfaces/Diseases';
import DiseaseImagesModal from './DiseaseImagesModal';
import { useAuth } from '../contexts/AuthContext';
import {  arrowForward } from 'ionicons/icons';
import ReturnButtonC from './ReturnButtonC';
import LabelMonitoring from './LabelMonitoring';

const SegmentMonitoreoDiseases = () => {
  const [diseasesArr] = useState(DISEASES);
  const { setSelectedDiseases, selectedDiseases,
    setActiveSegment,
  } = useMonitoringBloque();
  const [showModalDisease, setShowModalDisease] = useState<Disease | boolean>(false);
  const { expertUser } = useAuth();



  const handleSelectDisease = (disease: Disease) => () => {
    setSelectedDiseases(prev => {
      const isSelected = prev.some(d => d.id === disease.id);
      if (isSelected) {
        return prev.filter(d => d.id !== disease.id);
      } else {
        return [...prev, disease];
      }
    });
  }

  const handleViewDisease = (disease: Disease) => () => {
    setShowModalDisease(disease);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ReturnButtonC
          segmentReturn={'camas'}
        />

        <IonButton fill="clear" onClick={() => setActiveSegment('options')}>
          <IonIcon slot="end" icon={arrowForward}></IonIcon>
          avanzar
        </IonButton>
      </div>

      <LabelMonitoring/>
      <p>Seleccione enfermedad</p>
      <br />

      <div style={{ height: '60vh', overflowY: 'scroll' }}>
        {diseasesArr.map((disease) => (
          expertUser ? (
            <div key={disease.id}>
              <DiseaseCard
                disease={disease}
                handleSelectDisease={handleSelectDisease}
                selectedDiseases={selectedDiseases}
              />
            </div>
          ) : (
            <IonItemDivider key={disease.id}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '1rem 0' }}>
                <DiseaseCard
                  disease={disease}
                  handleSelectDisease={handleSelectDisease}
                  selectedDiseases={selectedDiseases}
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
