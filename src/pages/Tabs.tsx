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

// Import tab pages
import TabHome from './TabHome';
import TabMonitoreo from './TabMonitoreo';
import TabLibrary from './TabLibrary';
import TabSettings from './TabSettings';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { cleanUser } from '../store/slices/userSlice';

const Tabs: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }


  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tabs/home">
            <TabHome />
          </Route>
          <Route exact path="/tabs/monitoreo">
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
            <IonIcon size='large' icon={home} />
            <IonLabel>Principal</IonLabel>
          </IonTabButton>

          <IonTabButton tab="monitoreo" href="/tabs/monitoreo">
            <IonIcon size='large' icon={rose} />
            <IonLabel>Monitoreo</IonLabel>
          </IonTabButton>


          <IonTabButton tab="settings" href="/tabs/settings">
            <IonIcon size='large' icon={settings} />
            <IonLabel>Configurar</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default Tabs;
