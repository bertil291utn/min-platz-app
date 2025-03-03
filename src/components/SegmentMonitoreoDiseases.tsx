import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import acaros01 from '../assets/rosas-diseases/acaros/acaros01.png';
import acaros02 from '../assets/rosas-diseases/acaros/acaros02.jpg';
// import infoAcacros from '../assets/data/rosas-diseases/acaros/info.txt';

const SegmentMonitoreoDiseases = () => {

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
      <img src={acaros01} alt="Ácaros" style={{ width: '100%', height: '500px' }} />
      <img src={acaros02} alt="Ácaros2" style={{ width: '100%', height: '500px' }} />
    </div>

  );
}

export default SegmentMonitoreoDiseases;