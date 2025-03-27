import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveData, getData } from '../../utils/db';

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

export const loadLocalData = createAsyncThunk(
  'appState/loadLocalData',
  async () => {
    const localData = await getData('user-data', 'app-state');
    return { hasLocalData: !!localData };
  }
);

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
  },
  extraReducers: (builder) => {
   

    builder
      .addCase(loadLocalData.pending, (state) => {
        // Optional: Add loading state if needed
      })
      .addCase(loadLocalData.fulfilled, (state, action) => {
        state.hasLocalData = action.payload.hasLocalData;
      })
      .addCase(loadLocalData.rejected, (state) => {
        state.hasLocalData = false;
      });
  },
});

export const { setOnlineStatus, setHasLocalData, setAppInstalled } = appStateSlice.actions;
export default appStateSlice.reducer;