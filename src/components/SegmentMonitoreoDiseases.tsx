import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import { useState } from 'react';
import { DISEASES } from '../helpers/diseases';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonItemDivider } from '@ionic/react';
import { Disease } from '../interfaces/Diseases';
import DiseaseImagesModal from './DiseaseImagesModal';

const SegmentMonitoreoDiseases = () => {
  const [diseasesArr] = useState(DISEASES);
  const { setSelectedDisease, selectedDisease } = useMonitoringBloque();
  const [showModalDisease, setShowModalDisease] = useState<Disease | boolean>(false);

  const handleChangeSegment = (disease: Disease) => () => {
    selectedDisease?.id == disease.id ? setSelectedDisease(undefined) : setSelectedDisease(disease);
    // setActiveSegment('camas');
  }

  const handleViewDisease = (disease: Disease) => () => {
    setShowModalDisease(disease);
  }

  const {
    selectedBloque,
    selectedCuadro,
    selectedCama,
    setActiveSegment
  } = useMonitoringBloque();
  return (
    <div>
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

      <p>Seleccione una enfermedad</p>
      <br />
      {diseasesArr.map((disease) => (
        <IonItemDivider key={disease.id}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '1rem 0' }}>
            <IonCard key={disease.id} onClick={handleChangeSegment(disease)}
              color={selectedDisease?.id == disease.id ? 'primary' : ''}
            >
              <IonCardHeader>
                <IonCardTitle>{disease.name}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
            <IonButton fill="clear" expand='block'
              onClick={handleViewDisease(disease)}
            >ver como son {disease.name}?</IonButton>
          </div>
        </IonItemDivider>
      ))}

      {showModalDisease &&
        <DiseaseImagesModal
          isOpen={!!showModalDisease}
          onDismiss={() => setShowModalDisease(false)}
          disease={showModalDisease as Disease}
        />}
    </div>

  );
}

export default SegmentMonitoreoDiseases;