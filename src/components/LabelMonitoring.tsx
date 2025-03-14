import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';

const LabelMonitoring = () => {

  const {
    selectedBloque,
    selectedCuadro,
    selectedCama,
    setActiveSegment
  } = useMonitoringBloque();
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    }}>
      <p onClick={()=>setActiveSegment('camas')} style={{ fontWeight: 'bold' }}>Cuadro #{selectedCuadro}</p>
      <p onClick={()=>setActiveSegment('bloques')} style={{ fontSize: '0.6rem', color: '#6B7280' }}>{selectedBloque?.name}</p>
      <p onClick={()=>setActiveSegment('camas')} style={{ fontWeight: 'bold' }}>Cama #{selectedCama}</p>
    </div>
  );
}

export default LabelMonitoring;