import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isOnline: boolean;
  hasLocalData: boolean;
  isAppInstalled: boolean;
}

const initialState: AppState = {
  isOnline: navigator.onLine,
  hasLocalData: false,
  isAppInstalled: false
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setHasLocalData: (state, action: PayloadAction<boolean>) => {
      state.hasLocalData = action.payload;
    },
    setAppInstalled: (state, action: PayloadAction<boolean>) => {
      state.isAppInstalled = action.payload;
    }
  }
});

export const { setOnlineStatus, setHasLocalData, setAppInstalled } = appStateSlice.actions;
export default appStateSlice.reducer;