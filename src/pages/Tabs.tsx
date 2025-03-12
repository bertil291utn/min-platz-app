import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonPage,
} from '@ionic/react';
import { library, home, settings, rose } from 'ionicons/icons';
import { useAuth } from '../contexts/AuthContext';
import { useBloqueInfo } from '../contexts/BloqueInfoContext';

// Import tab pages
import TabHome from './TabHome';
import TabMonitoreo from './TabMonitoreo';
import TabLibrary from './TabLibrary';
import TabSettings from './TabSettings';

const Tabs: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { getBloques } = useBloqueInfo();

  useEffect(() => {
    getBloques();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tabs/home">
            <TabHome logout={logout} />
          </Route>
          <Route path="/tabs/monitoreo">
            <TabMonitoreo />
          </Route>
          <Route exact path="/tabs/library">
            <TabLibrary />
          </Route>
          <Route exact path="/tabs/settings">
            <TabSettings />
          </Route>
          <Route exact path="/tabs">
            <Redirect to="/tabs/monitoreo" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/tabs/home">
            <IonIcon icon={home} />
            <IonLabel>Principal</IonLabel>
          </IonTabButton>

          <IonTabButton tab="monitoreo" href="/tabs/monitoreo">
            <IonIcon icon={rose} />
            <IonLabel>Monitoreo</IonLabel>
          </IonTabButton>

          <IonTabButton tab="library" href="/tabs/library">
            <IonIcon icon={library} />
            <IonLabel>Library</IonLabel>
          </IonTabButton>

          <IonTabButton tab="settings" href="/tabs/settings">
            <IonIcon icon={settings} />
            <IonLabel>Configurar</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default Tabs;
