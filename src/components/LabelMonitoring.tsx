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
      <h1 onClick={()=>setActiveSegment('camas')} style={{ fontWeight: 'bold' }}>Cuadro #{selectedCuadro}</h1>
      <h2 onClick={()=>setActiveSegment('bloques')} style={{ fontSize: '0.875rem', color: '#6B7280' }}>{selectedBloque?.name}</h2>
      <h1 onClick={()=>setActiveSegment('camas')} style={{ fontWeight: 'bold' }}>Cama #{selectedCama}</h1>
    </div>
  );
}

export default LabelMonitoring;