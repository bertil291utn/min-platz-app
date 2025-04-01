import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isOnline: boolean;
}

const initialState: AppState = {
  isOnline: navigator.onLine,
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    }
  }
});

export const { setOnlineStatus } = appStateSlice.actions;

export default appStateSlice.reducer;