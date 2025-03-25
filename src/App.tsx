import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Tabs from './pages/Tabs';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { setOnlineStatus, setHasLocalData, setAppInstalled } from './store/slices/appStateSlice';

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


const AppRoutes: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <IonRouterOutlet>
      <Route exact path="/login">
        {isAuthenticated ? <Redirect to="/tabs" /> : <LoginPages />}
      </Route>
      <Route path="/tabs">
        {!isAuthenticated ? <Redirect to="/login" /> : <Tabs />}
      </Route>
      <Route exact path="/">
        <Redirect to={isAuthenticated ? "/tabs" : "/login"} />
      </Route>
    </IonRouterOutlet>
  );
};

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check online status
    const handleOnline = () => dispatch(setOnlineStatus(true));
    const handleOffline = () => dispatch(setOnlineStatus(false));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for existing local data
    const checkLocalData = () => {
      const hasData = [
        'mallas-monitored',
        'placas-monitored',
        'camas-monitored',
        'bloques-data'
      ].some(key => localStorage.getItem(key));
      
      dispatch(setHasLocalData(hasData));
    };

    checkLocalData();

    // Check if app is installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    dispatch(setAppInstalled(isInstalled));

    // Listen for changes in display mode
    window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
      dispatch(setAppInstalled(evt.matches));
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet animated={false}>
          <AppRoutes />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  let deferredPrompt: any;

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      dispatch(setAppInstalled(false));
    });

    window.addEventListener('appinstalled', () => {
      // Clear the deferredPrompt
      deferredPrompt = null;
      // Update UI
      dispatch(setAppInstalled(true));
    });
  }, [dispatch]);

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
