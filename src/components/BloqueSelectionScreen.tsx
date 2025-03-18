import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Bloque } from '../interfaces/Bloque';
import { setSelectedBloque, setActiveSegment } from '../store/slices/monitoringBloqueSlice';
import { selectActiveBloques } from '../store/slices/bloqueInfoSlice';
import { leafOutline, gridOutline, scanOutline } from 'ionicons/icons';
import './Monitoring.css';

interface BloqueSelectionScreenProps {
  onBloqueSelect?: (bloque: Bloque) => void;
}

const BloqueSelectionScreen = ({ onBloqueSelect }: BloqueSelectionScreenProps) => {
  const activeBloques = useAppSelector(selectActiveBloques);
  const dispatch = useAppDispatch();

  const handleBloqueSelect = (bloque: Bloque) => {
    dispatch(setSelectedBloque(bloque));
    
    // If a custom handler is provided, use it
    if (onBloqueSelect) {
      onBloqueSelect(bloque);
    } else {
      // Otherwise, use the default behavior
      // dispatch(setActiveSegment('monitoring-options'));
    }
  };

  return (
    <div className="ion-padding">
      <h2 className="ion-text-center">Seleccione un Bloque</h2>
      <IonGrid>
        <IonRow>
          {activeBloques.map((bloque: Bloque) => (
            <IonCol size="12" sizeMd="6" sizeLg="4" key={bloque.id}>
              <IonCard 
                button 
                onClick={() => handleBloqueSelect(bloque)}
                className="bloque-card"
              >
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={leafOutline} slot="start" />
                    {bloque.name}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="bloque-info">
                    <p>
                      <IonIcon icon={gridOutline} /> {bloque.numCamas} camas
                    </p>
                    <p>
                      <IonIcon icon={scanOutline} /> {bloque.numCuadrosPerCama} cuadros por cama
                    </p>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default BloqueSelectionScreen;
