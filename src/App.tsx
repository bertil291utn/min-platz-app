import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Tabs from './pages/Tabs';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CountProvider } from './contexts/CountContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/tabs.css';
import LoginPages from './pages/LoginPages';

setupIonicReact();

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <IonRouterOutlet>
      <Route exact path="/login">
        {isAuthenticated ? <Redirect to="/tabs" /> : <LoginPages />}
      </Route>
      {/* <Route exact path="/home">
        {!isAuthenticated ? <Redirect to="/login" /> : <Home />}
      </Route> */}
      {/* check if it really need to use this route because tabs is replacing */}
      <Route path="/tabs">
        {!isAuthenticated ? <Redirect to="/login" /> : <Tabs />}
      </Route>
      <Route exact path="/">
        <Redirect to={isAuthenticated ? "/tabs" : "/login"} />
      </Route>
    </IonRouterOutlet>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <CountProvider>
        <AuthProvider>
          <IonReactRouter>
            <AppRoutes />
          </IonReactRouter>
        </AuthProvider>
      </CountProvider>
    </IonApp>
  );
};

export default App;
