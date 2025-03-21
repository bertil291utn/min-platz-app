import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store';
import { checkAuthStatus, setAuthenticated } from './store/slices/authSlice';
import { fetchBloques } from './store/slices/bloqueInfoSlice';
import { fetchMonitoredBloques } from './store/slices/monitoringBloqueSlice';
import { USER_AUTH, USER_SET } from './helpers/AuthConst';
import { setUser } from './store/slices/userSlice';

// Initialize Redux store with data from localStorage
store.dispatch(checkAuthStatus());
store.dispatch(fetchBloques());
store.dispatch(fetchMonitoredBloques());

const storedUser = localStorage.getItem(USER_SET);
if (!storedUser) {
  store.dispatch(setAuthenticated(false));
}else{
  store.dispatch(setUser(JSON.parse(storedUser)));

}
// Set up online/offline listeners for monitoring
window.addEventListener('online', () => {
  store.dispatch({ type: 'monitoringBloque/setIsOnline', payload: true });
});
window.addEventListener('offline', () => {
  store.dispatch({ type: 'monitoringBloque/setIsOnline', payload: false });
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
