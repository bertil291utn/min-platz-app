import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bloqueInfoReducer from './slices/bloqueInfoSlice';
import monitoringBloqueReducer from './slices/monitoringBloqueSlice';
import viewMonitoredReducer from './slices/viewMonitoredSlice';
import userReducer from './slices/userSlice';
import placasMonitoringReducer from './slices/placasMonitoringSlice';
import viewPlacasReducer from './slices/viewPlacasSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bloqueInfo: bloqueInfoReducer,
    monitoringBloque: monitoringBloqueReducer,
    viewMonitored: viewMonitoredReducer,
    userLogged: userReducer,
    placasMonitoring: placasMonitoringReducer,
    viewPlacas: viewPlacasReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
