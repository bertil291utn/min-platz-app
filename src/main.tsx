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
import { setupIonicReact } from '@ionic/react';
import './theme/variables.css';
import { fetchMallasMonitored } from './store/slices/mallasMonitoringSlice';

setupIonicReact({
  mode: 'md',
  swipeBackEnabled: false,
  hardwareBackButton: true,
  animated: false
});



// Fetch initial data
store.dispatch(fetchBloques());
store.dispatch(fetchMonitoredBloques());
store.dispatch(fetchMallasMonitored());
store.dispatch(checkAuthStatus());

// Render the application
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
