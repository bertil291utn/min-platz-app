import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import { useState } from 'react';
import { DISEASES } from '../helpers/diseases';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonItemDivider } from '@ionic/react';
import { Disease } from '../interfaces/Diseases';
import DiseaseImagesModal from './DiseaseImagesModal';
import { useAuth } from '../contexts/AuthContext';
import { arrowBack } from 'ionicons/icons';
import ReturnButtonC from './ReturnButtonC';

const SegmentMonitoreoDiseases = () => {
  const [diseasesArr] = useState(DISEASES);
  const { setSelectedDiseases, selectedDiseases,
    selectedBloque,
    selectedCuadro,
    selectedCama,
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

      <ReturnButtonC
        segmentReturn={'camas'}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h1 style={{ fontWeight: 'bold' }}>Cuadro #{selectedCuadro}</h1>
        <h2 style={{ fontSize: '0.875rem', color: '#6B7280' }}>{selectedBloque?.name}</h2>
        <h1 style={{ fontWeight: 'bold' }}>Cama #{selectedCama}</h1>
      </div>

      <p>Seleccione enfermedad</p>
      <br />
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
