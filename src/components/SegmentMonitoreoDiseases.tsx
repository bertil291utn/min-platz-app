import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import acaros01 from '../assets/rosas-diseases/acaros/acaros01.png';
import acaros02 from '../assets/rosas-diseases/acaros/acaros02.jpg';
import { useEffect, useState } from 'react';
import { DISEASES } from '../helpers/diseases';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonItemDivider } from '@ionic/react';
import { Disease } from '../interfaces/Diseases';
// import infoAcacros from '../assets/data/rosas-diseases/acaros/info.txt';

const SegmentMonitoreoDiseases = () => {
  const [diseasesArr] = useState(DISEASES);
  const { setSelectedDisease, selectedDisease } = useMonitoringBloque();


  const handleChangeSegment = (disease: Disease) => () => {
    selectedDisease?.id == disease.id ? setSelectedDisease(undefined) : setSelectedDisease(disease);
    // setActiveSegment('camas');
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
        <IonItemDivider>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '1rem 0' }}>
            <IonCard key={disease.id} onClick={handleChangeSegment(disease)}
              color={selectedDisease?.id == disease.id ? 'primary' : ''}
            >
              <IonCardHeader>
                <IonCardTitle>{disease.name}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
            <IonButton fill="clear" expand='block'>ver como son {disease.name}?</IonButton>
          </div>
        </IonItemDivider>
      ))}

      {/* <img src={acaros01} alt="Ácaros" style={{ width: '100%', height: '500px' }} />
      <img src={acaros02} alt="Ácaros2" style={{ width: '100%', height: '500px' }} /> */}
    </div>

  );
}

export default SegmentMonitoreoDiseases;