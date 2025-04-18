import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { setOnlineStatus } from './store/slices/appStateSlice';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { fetchMallasMonitored } from './store/slices/mallasMonitoringSlice';
import { setAuthenticated } from './store/slices/authSlice';
import { setUser } from './store/slices/userSlice';
import { USER_AUTH } from './helpers/AuthConst';
import { getStoredAuth, verifyToken, isTokenExpired } from './services/authService';
import { getUserByCi } from './services/userService';
import { StorageService } from './services/storageService';
import Menu from './components/Menu';
import AppRoutes from './components/AppRoutes';
import HelpFabWrapper from './components/HelpFabWrapper';
import { User } from './interfaces/User';

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

// App wrapper component that includes state management
const AppWrapper = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Check initial authentication state
  useEffect(() => {
    const checkInitialAuth = async () => {
      const authData = await getStoredAuth();
      if (authData) {
        try {
          if (authData.token && !isTokenExpired(authData.token)) {
            const payload = await verifyToken(authData.token);
            if (payload && payload.ci === authData.ci) {
              dispatch(setAuthenticated(true));
              
              // Get user data from Firestore
              const userData = await getUserByCi(authData.ci);
              if (userData) {
                dispatch(setUser({
                  id: userData.ci,
                  ci: userData.ci,
                  name: userData.nombre,
                  lastName: userData.apellido,
                  email: userData.email,
                  whatsapp: userData.whatsapp,
                  premium: userData.premium || false,
                  expert: userData.expert || false
                }));
              }
              return;
            }
          }
          
          // Token invalid or expired
          await StorageService.remove(USER_AUTH);
          dispatch(setAuthenticated(false));
        } catch (e) {
          console.error('Error checking initial auth:', e);
          await StorageService.remove(USER_AUTH);
          dispatch(setAuthenticated(false));
        }
      }

      // Migrate existing data if any
      await StorageService.migrateFromLocalStorage(USER_AUTH);
    };

    checkInitialAuth();
  }, [dispatch]);

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

  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <AppRoutes />
        <HelpFabWrapper />
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
