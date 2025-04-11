import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { checkmarkOutline, infiniteOutline, businessOutline, documentOutline, statsChartOutline, peopleOutline } from 'ionicons/icons';

export const TierPrice: React.FC = () => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12" sizeMd="4">
          <IonCard className="highlighted-card" style={{
            border: '2px solid var(--ion-color-success)',
            transform: 'scale(1.05)',
            zIndex: 1,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <IonCardHeader>
              <div className="ion-text-center">
                <div style={{
                  background: 'var(--ion-color-success)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '16px',
                  display: 'inline-block',
                  marginBottom: '8px',
                  fontSize: '0.9em'
                }}>
                  Más Popular
                </div>
                <IonCardTitle>Super Usuario</IonCardTitle>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <div className="ion-text-center ion-margin-bottom">
                <h1>$10</h1>
                <p>por mes</p>
              </div>
              <IonList lines="none">
                <IonItem>
                  <IonIcon icon={documentOutline} slot="start" color="success" />
                  <IonLabel>Descarga de documentación PDF</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={checkmarkOutline} slot="start" color="success" />
                  <IonLabel>Facturación gratuita</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={statsChartOutline} slot="start" color="success" />
                  <IonLabel>Datos personalizados para revisión</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={checkmarkOutline} slot="start" color="success" />
                  <IonLabel>Revisión de menús completos</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={peopleOutline} slot="start" color="success" />
                  <IonLabel>Soporte prioritario</IonLabel>
                </IonItem>
              </IonList>
              <IonButton expand="block" color="success" className="ion-margin-top">
                Seleccionar Plan
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonCol>

        <IonCol size="12" sizeMd="4">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">Empresarial</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="ion-text-center ion-margin-bottom">
                <h2>Solución Personalizada</h2>
              </div>
              <IonList lines="none">
                <IonItem>
                  <IonIcon icon={businessOutline} slot="start"  />
                  <IonLabel>Gestión de postcosecha avanzada</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={checkmarkOutline} slot="start"  />
                  <IonLabel>Integración con sistemas existentes</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={checkmarkOutline} slot="start"  />
                  <IonLabel>Reportes personalizados</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={peopleOutline} slot="start"  />
                  <IonLabel>Soporte dedicado 24/7</IonLabel>
                </IonItem>
              </IonList>
              <IonButton expand="block"  className="ion-margin-top" fill='outline'>
                Contáctanos
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonCol>

        <IonCol size="12" sizeMd="4">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">Gratis</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="ion-text-center ion-margin-bottom">
                <h1>$0</h1>
                <p>por mes</p>
              </div>
              <IonList lines="none">
                <IonItem>
                  <IonIcon icon={infiniteOutline} slot="start" />
                  <IonLabel>Acceso a funciones básicas</IonLabel>
                </IonItem>
              </IonList>
              <IonButton expand="block" className="ion-margin-top" fill='outline'>
                Comenzar Gratis
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default TierPrice; 