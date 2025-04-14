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
  IonProgressBar,
  IonButton,
  IonList,
  IonBadge,
  IonSegment,
  IonSegmentButton
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
  sadOutline,
  analyticsOutline,
  cubeOutline,
  checkmarkCircleOutline,
  calendarOutline,
  documentTextOutline,
  barChartOutline,
  alertOutline,
  cameraOutline,
  peopleOutline,
  downloadOutline
} from 'ionicons/icons';
import './Home.css';
import { dashboardData, productionMetrics } from '../data/mockData';

const Home: React.FC = () => {
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

            {/* Predictive Analysis Section */}
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                      <IonIcon icon={analyticsOutline} style={{ fontSize: '32px', color: 'var(--ion-color-primary)' }} />
                      <h3>¿Qué viene para la finca?</h3>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="ion-text-center">
                      <h2>Próximos días</h2>
                      <IonProgressBar 
                        value={0.75} 
                        color="success"
                        style={{ height: '10px', borderRadius: '5px', margin: '10px 0' }}
                      />
                      <p style={{ color: 'var(--ion-color-success)' }}>¡Todo va bien!</p>
                    </div>
                    <IonList>
                      <IonItem>
                        <IonIcon icon={barChartOutline} slot="start" color="primary" />
                        <IonLabel>
                          <h2>Producción</h2>
                          <p>Más tallos que el año pasado</p>
                        </IonLabel>
                        <IonIcon icon={trendingUpOutline} color="success" />
                      </IonItem>
                      {dashboardData.predictiveAnalysis.alerts.map((alert, index) => (
                        <IonItem key={index}>
                          <IonIcon icon={alertOutline} slot="start" color={alert.type === 'warning' ? 'warning' : 'medium'} />
                          <IonLabel>
                            <p>{alert.message}</p>
                          </IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Inventory Management */}
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                      <IonIcon icon={cubeOutline} style={{ fontSize: '32px', color: 'var(--ion-color-secondary)' }} />
                      <h3>¿Qué necesitamos?</h3>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="ion-text-center">
                      <IonProgressBar 
                        value={dashboardData.inventory.stockHealth / 100}
                        color={dashboardData.inventory.stockHealth > 70 ? 'success' : 'warning'}
                        style={{ height: '10px', borderRadius: '5px', margin: '10px 0' }}
                      />
                      <p>{dashboardData.inventory.stockHealth > 70 ? '¡Todo en orden!' : 'Necesitamos reponer'} </p>
                    </div>
                    <IonList>
                      <IonItem>
                        <IonIcon icon={alertCircleOutline} slot="start" color="danger" />
                        <IonLabel>
                          <h2>¡Atención!</h2>
                          <p>Necesitamos reponer:</p>
                          <p style={{ fontSize: '14px' }}>{dashboardData.inventory.lowStock.join(', ')}</p>
                        </IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Quality Control */}
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                      <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '32px', color: 'var(--ion-color-tertiary)' }} />
                      <h3>¿Cómo están las flores?</h3>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {dashboardData.qualityControl.topVarieties.map((variety, index) => (
                      <div key={index} className="ion-margin-bottom">
                        <IonItem lines="none">
                          <IonIcon icon={flowerOutline} slot="start" color="tertiary" />
                          <IonLabel>
                            <h2>{variety.name}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <IonIcon icon={happyOutline} color="success" />
                              <p style={{ margin: 0 }}>¡Muy buenas!</p>
                            </div>
                          </IonLabel>
                        </IonItem>
                      </div>
                    ))}
                    
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Harvest Planning */}
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                      <IonIcon icon={calendarOutline} style={{ fontSize: '32px', color: 'var(--ion-color-success)' }} />
                      <h3>¿Cuándo cosechamos?</h3>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="ion-text-center">
                      <h2>Próxima cosecha</h2>
                      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{dashboardData.harvestPlanning.nextHarvest}</p>
                      <p>Necesitamos {dashboardData.harvestPlanning.workersNeeded} personas</p>
                    </div>
                    <IonList>
                      <IonItem>
                        <IonIcon icon={peopleOutline} slot="start" color="success" />
                        <IonLabel>
                          <h2>Personas necesarias</h2>
                          <p>{dashboardData.harvestPlanning.workersNeeded} trabajadores</p>
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={leafOutline} slot="start" color="success" />
                        <IonLabel>
                          <h2>Bloques a cosechar</h2>
                          <p>{dashboardData.harvestPlanning.activeBlocks.join(', ')}</p>
                        </IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Custom Reports */}
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                      <IonIcon icon={documentTextOutline} style={{ fontSize: '32px', color: 'var(--ion-color-medium)' }} />
                      <h3>Informes de la finca</h3>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="ion-text-center ion-margin-bottom">
                      <h2>¿Qué quieres saber?</h2>
                      <p>Elige un informe para ver</p>
                    </div>
                    <IonList>
                      {dashboardData.reports.available.map((report, index) => (
                        <IonItem key={index}>
                          <IonLabel>
                            <h2>{report}</h2>
                            <IonButton expand="block" color="medium" size="small" className="ion-margin-top">
                              Ver informe
                            </IonButton>
                          </IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                    <div className="ion-text-center ion-padding-top">
                      <p style={{ color: 'var(--ion-color-success)' }}>¡Mejor que el año pasado!</p>
                      <IonBadge color="success">+15%</IonBadge>
                    </div>
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
