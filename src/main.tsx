import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import { checkAuthStatus, setAuthenticated } from './store/slices/authSlice';
import { fetchBloques } from './store/slices/bloqueInfoSlice';
import { fetchMonitoredBloques } from './store/slices/monitoringBloqueSlice';
import { USER_AUTH, USER_SET } from './helpers/AuthConst';
import { setUser } from './store/slices/userSlice';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { registerServiceWorker } from './utils/service-worker-registration';
import { setupIonicReact } from '@ionic/react';
import './theme/variables.css';
import { setHasLocalData } from './store/slices/appStateSlice';
import { initDB } from './utils/db';
import { saveAppState, loadAppState } from './services/dataService';

setupIonicReact({
  mode: 'md',
  swipeBackEnabled: false,
  hardwareBackButton: true,
  animated: false
});

// Initialize Redux store with data from localStorage
store.dispatch(checkAuthStatus());
store.dispatch(fetchBloques()); // Preload bloques data
store.dispatch(fetchMonitoredBloques()); // Preload monitored bloques

// Check if local data exists
const checkLocalData = () => {
  const hasData = [
    'bloques-data',
    'placas-monitored',
    'camas-monitored'
  ].some((key) => localStorage.getItem(key));

  store.dispatch(setHasLocalData(hasData));
};

checkLocalData();

const storedUser = localStorage.getItem(USER_SET);
if (!storedUser) {
  store.dispatch(setAuthenticated(false));
} else {
  store.dispatch(setUser(JSON.parse(storedUser)));
}

// Set up online/offline listeners for monitoring
window.addEventListener('online', () => {
  store.dispatch({ type: 'monitoringBloque/setIsOnline', payload: true });
});
window.addEventListener('offline', () => {
  store.dispatch({ type: 'monitoringBloque/setIsOnline', payload: false });
});

// Async function to handle IndexedDB operations
const handleIndexedDB = async () => {
  await initDB();
  console.log('IndexedDB initialized');

  // Save app state to IndexedDB
  await saveAppState({ isOnline: navigator.onLine, hasLocalData: true });

  // Retrieve app state from IndexedDB
  const appState = await loadAppState();
  console.log('Loaded app state from IndexedDB:', appState);
};

// Call the async function
handleIndexedDB();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Call this after ReactDOM.render
defineCustomElements(window);

// Register service worker
registerServiceWorker();
