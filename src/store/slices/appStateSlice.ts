import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  isOnline: boolean;
  hasLocalData: boolean;
}

const initialState: AppState = {
  isOnline: navigator.onLine,
  hasLocalData: false
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
    setHasLocalData: (state, action) => {
      state.hasLocalData = action.payload;
    }
  }
});

export const { setOnlineStatus, setHasLocalData } = appStateSlice.actions;
export default appStateSlice.reducer;