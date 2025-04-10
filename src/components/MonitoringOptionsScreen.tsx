import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveSegment } from '../store/slices/monitoringBloqueSlice';
import { bedOutline, gridOutline, scanOutline } from 'ionicons/icons';
import ReturnButtonC from './ReturnButtonC';
import './Monitoring.css';
import { MonitoringModal } from '../interfaces/Monitoring';

interface MonitoringOptionsScreenProps {
  onOptionSelect?: (option: MonitoringModal) => void;
  showReturnButton?: boolean;
}

const MonitoringOptionsScreen = ({
  onOptionSelect,
  showReturnButton = true
}: MonitoringOptionsScreenProps) => {
  const selectedBloque = useAppSelector(state => state.monitoringBloque.selectedBloque);
  const dispatch = useAppDispatch();

  const handleOptionSelect = (option: MonitoringModal) => {
    // If a custom handler is provided, use it
    if (onOptionSelect) {
      onOptionSelect(option);
    } else {
      // Otherwise, use the default behavior
      // dispatch(setActiveSegment(option));
    }
  };

  return (
    <div>

      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="4">
            <IonCard
              button
              onClick={() => handleOptionSelect('monitorear-camas')}
              className="monitoring-option-card"
            >
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={bedOutline} slot="start" />
                  Monitoreo por Cama
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Monitoreo detallado por cama y cuadro</p>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="4">
            <IonCard
              button
              onClick={() => handleOptionSelect('monitorear-placas')}
              className="monitoring-option-card"
            >
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={gridOutline} slot="start" />
                  Monitoreo de Placas
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Monitoreo específico de placas</p>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="4">
            <IonCard
              button
              onClick={() => handleOptionSelect('monitorear-mallas')}
              className="monitoring-option-card"
            >
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={scanOutline} slot="start" />
                  Monitoreo por Mallas
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Monitoreo por sistema de mallas</p>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default MonitoringOptionsScreen;
