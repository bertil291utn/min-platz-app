import React from 'react';
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
import { playCircle, radio, library, search } from 'ionicons/icons';
import { useAuth } from '../contexts/AuthContext';

// Import tab pages
import TabHome from './TabHome';
import TabRadio from './TabRadio';
import TabLibrary from './TabLibrary';
import TabSearch from './TabSearch';

const Tabs: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

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
          <Route exact path="/tabs/radio">
            <TabRadio />
          </Route>
          <Route exact path="/tabs/library">
            <TabLibrary />
          </Route>
          <Route exact path="/tabs/search">
            <TabSearch />
          </Route>
          <Route exact path="/tabs">
            <Redirect to="/tabs/home" />
          </Route>
        </IonRouterOutlet>
        
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/tabs/home">
            <IonIcon icon={playCircle} />
            <IonLabel>Listen Now</IonLabel>
          </IonTabButton>
          
          <IonTabButton tab="radio" href="/tabs/radio">
            <IonIcon icon={radio} />
            <IonLabel>Radio</IonLabel>
          </IonTabButton>
          
          <IonTabButton tab="library" href="/tabs/library">
            <IonIcon icon={library} />
            <IonLabel>Library</IonLabel>
          </IonTabButton>
          
          <IonTabButton tab="search" href="/tabs/search">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default Tabs;
