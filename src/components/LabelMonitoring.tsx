
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveSegment } from '../store/slices/monitoringBloqueSlice';

const LabelMonitoring = () => {

  const dispatch = useAppDispatch();
  const selectedBloque=useAppSelector(state=>state.monitoringBloque.selectedBloque);
  const selectedCuadro=useAppSelector(state=>state.monitoringBloque.selectedCuadro);
  const selectedCama=useAppSelector(state=>state.monitoringBloque.selectedCama);
  
  return (
    <div className="sticky-header" style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <p onClick={() => dispatch(setActiveSegment('camas'))} style={{ fontWeight: 'bold' }}>Cuadro #{selectedCuadro}</p>
        <p onClick={() => dispatch(setActiveSegment('bloques'))} style={{ fontSize: '0.6rem', color: '#6B7280' }}>{selectedBloque?.name}</p>
        <p onClick={() => dispatch(setActiveSegment('camas'))} style={{ fontWeight: 'bold' }}>Cama #{selectedCama}</p>
      </div>
    </div>
  );
}

export default LabelMonitoring;