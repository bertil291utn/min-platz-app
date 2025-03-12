import React from 'react';
import { 
  IonContent, 
  IonPage, 
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonBackButton
} from '@ionic/react';
import { Route, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { clipboardOutline, eyeOutline } from 'ionicons/icons';
import MonitoreoC from '../components/MonitoreoC';
import ViewMonitoredC from '../components/ViewMonitoredC';
import { MonitoringBloqueProvider } from '../contexts/MonitoringBloqueContext';

// Home component for the monitoring tab
const MonitoreoHome: React.FC = () => {
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid className="monitoring-cards">
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="6" sizeSm="12">
              <IonCard button onClick={() => history.push(`${url}/monitorear`)}>
                <IonCardHeader>
                  <IonIcon icon={clipboardOutline} size="large" color="primary" />
                  <IonCardTitle>Monitorear</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Iniciar nuevo monitoreo de bloques, camas y enfermedades
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" sizeSm="12">
              <IonCard button onClick={() => history.push(`${url}/ver`)}>
                <IonCardHeader>
                  <IonIcon icon={eyeOutline} size="large" color="secondary" />
                  <IonCardTitle>Ver Monitoreo</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Ver historial de monitoreos realizados anteriormente
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

// Monitorear page
const MonitorearPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <MonitoreoC />
      </IonContent>
    </IonPage>
  );
};

// Ver Monitoreo page
const VerMonitoreoPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <MonitoringBloqueProvider>
          <ViewMonitoredC />
        </MonitoringBloqueProvider>
      </IonContent>
    </IonPage>
  );
};

// Main TabMonitoreo component with routing
const TabMonitoreo: React.FC = () => {
  const { path } = useRouteMatch();
  
  return (
    <IonRouterOutlet>
      <Route exact path={path}>
        <MonitoreoHome />
      </Route>
      <Route path={`${path}/monitorear`}>
        <MonitorearPage />
      </Route>
      <Route path={`${path}/ver`}>
        <VerMonitoreoPage />
      </Route>
      <Route>
        <Redirect to={path} />
      </Route>
    </IonRouterOutlet>
  );
};

export default TabMonitoreo;
