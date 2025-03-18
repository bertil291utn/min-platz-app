import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useBloqueInfo } from '../contexts/BloqueInfoContext';
import { Bloque } from '../interfaces/Bloque';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import { leafOutline, gridOutline, scanOutline } from 'ionicons/icons';
import './Monitoring.css';

const BloqueSelectionScreen = () => {
  const { activeBloques } = useBloqueInfo();
  const { setSelectedBloque, setActiveSegment } = useMonitoringBloque();

  const handleBloqueSelect = (bloque: Bloque) => {
    setSelectedBloque(bloque);
    setActiveSegment('monitoring-options');
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