import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Tabs from './pages/Tabs';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { setOnlineStatus } from './store/slices/appStateSlice';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import RegisterPage from './pages/RegisterPage';
import VerificationPage from './pages/VerificationPage';
import { fetchMallasMonitored } from './store/slices/mallasMonitoringSlice';

// Define Capacitor types for TypeScript
interface CapacitorGlobal {
  isNativePlatform: () => boolean;
  Plugins: {
    StatusBar?: any;
    SplashScreen?: any;
    [key: string]: any;
  };
}

// Extend Window interface
declare global {
  interface Window {
    Capacitor?: CapacitorGlobal;
  }
}

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

// App wrapper component that includes state management
const AppWrapper = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Set up online/offline event listeners
    const handleOnline = () => dispatch(setOnlineStatus(true));
    const handleOffline = () => dispatch(setOnlineStatus(false));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialize Capacitor plugins if running on a native platform
    const isNativePlatform = typeof window !== 'undefined' && 
                             window.Capacitor && 
                             typeof window.Capacitor.isNativePlatform === 'function' && 
                             window.Capacitor.isNativePlatform();

    if (isNativePlatform) {
      try {
        // Only use the native plugins if we're on a native platform
        StatusBar.setStyle({ style: Style.Light });
        SplashScreen.hide();
      } catch (e) {
        console.log('Error initializing Capacitor plugins:', e);
      }
    } else {
      console.log('Running in web environment - Capacitor native plugins not available');
    }

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMallasMonitored());
    }
  }, [isAuthenticated, dispatch]);

  // Rest of your component...
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginPages />
          </Route>
          <Route exact path="/">
            <Redirect to={isAuthenticated ? "/tabs" : "/login"} />
          </Route>
          <Route path="/tabs">
            {isAuthenticated ? <Tabs /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/verify">
            <VerificationPage />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
};

export default App;
