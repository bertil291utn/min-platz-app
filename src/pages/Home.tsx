import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonTitle, 
  IonContent,
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonIcon,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonLabel,
  IonItem,
  IonProgressBar
} from '@ionic/react';
import { 
  flowerOutline,
  trendingUpOutline, 
  warningOutline, 
  leafOutline, 
  waterOutline,
  thumbsUpOutline,
  thumbsDownOutline,
  alertCircleOutline,
  happyOutline,
  sadOutline
} from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  // Mock data for demonstration
  const productionMetrics = {
    totalProduction: 15420,
    previousMonth: 14800,
    topVariety: "Freedom",
    topVarietyProduction: 3200,
    problemBlocks: ["Cama 13", "Cama 7"],
    monthlyRevenue: 45600,
    monthlyExpenses: 28900
  };

  // Helper function to get mood icon based on performance
  const getMoodIcon = (isGood: boolean) => isGood ? happyOutline : sadOutline;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mi Finca</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonGrid>
            {/* Production Status */}
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                      <IonIcon 
                        icon={getMoodIcon(productionMetrics.totalProduction > productionMetrics.previousMonth)} 
                        style={{ fontSize: '48px', color: productionMetrics.totalProduction > productionMetrics.previousMonth ? 'var(--ion-color-success)' : 'var(--ion-color-warning)' }} 
                      />
                      <h2>¿Cómo va mi finca hoy?</h2>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="ion-text-center">
                      <h3 style={{ color: productionMetrics.totalProduction > productionMetrics.previousMonth ? 'var(--ion-color-success)' : 'var(--ion-color-warning)' }}>
                        {productionMetrics.totalProduction > productionMetrics.previousMonth ? '¡Muy bien! Estamos produciendo más que el mes pasado' : 'Podemos mejorar, estamos produciendo menos que el mes pasado'}
                      </h3>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Best Performing Rose */}
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                      <IonIcon icon={flowerOutline} style={{ fontSize: '32px', color: 'var(--ion-color-tertiary)' }} />
                      <h3>La Mejor Variedad</h3>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="ion-text-center">
                      <h2 style={{ color: 'var(--ion-color-tertiary)' }}>
                        {productionMetrics.topVariety}
                      </h2>
                      <p>Esta variedad nos está dando los mejores resultados</p>
                      <IonProgressBar 
                        value={0.208} 
                        color="tertiary"
                        style={{ height: '10px', borderRadius: '5px', margin: '10px 0' }}
                      />
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Money Status */}
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                      <h3>Estado del Dinero</h3>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem lines="none">
                      <IonIcon icon={thumbsUpOutline} slot="start" color="success" style={{ fontSize: '24px' }} />
                      <IonLabel>
                        <h2>Lo que ganamos</h2>
                        <h3 style={{ color: 'var(--ion-color-success)' }}>${productionMetrics.monthlyRevenue.toLocaleString()}</h3>
                      </IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonIcon icon={thumbsDownOutline} slot="start" color="danger" style={{ fontSize: '24px' }} />
                      <IonLabel>
                        <h2>Lo que gastamos</h2>
                        <h3 style={{ color: 'var(--ion-color-danger)' }}>${productionMetrics.monthlyExpenses.toLocaleString()}</h3>
                      </IonLabel>
                    </IonItem>
                    <div className="ion-text-center ion-padding-top">
                      <h3>Lo que nos queda:</h3>
                      <h2 style={{ color: 'var(--ion-color-success)' }}>
                        ${(productionMetrics.monthlyRevenue - productionMetrics.monthlyExpenses).toLocaleString()}
                      </h2>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Areas that Need Attention */}
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                      <IonIcon icon={alertCircleOutline} style={{ fontSize: '32px', color: 'var(--ion-color-warning)' }} />
                      <h3>Áreas que Necesitan Atención</h3>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="ion-text-center">
                      {productionMetrics.problemBlocks.map((block, index) => (
                        <div key={index} className="ion-margin-bottom">
                          <h3>{block}</h3>
                          <IonProgressBar 
                            value={0.85} 
                            color="warning"
                            style={{ height: '10px', borderRadius: '5px', margin: '5px 0' }}
                          />
                          <p>Esta cama necesita más cuidado</p>
                        </div>
                      ))}
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Video Section */}
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardContent className="ion-text-center">
                    <video controls width="100%" preload="metadata" poster="miniatura.jpg">
                      <source src="assets/videor/intro.webm" type="video/webm" />
                      Tu navegador no soporta el video.
                    </video>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
