import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BloqueMallaMonitored, MallaMonitored } from '../../interfaces/MallasMonitoring';

type ViewSegment = 'bloques' | 'mallas' | 'details';

interface ViewMallasState {
  activeViewSegment: ViewSegment;
  selectedBloque: BloqueMallaMonitored | null;
  selectedMalla: MallaMonitored | null;
}

const initialState: ViewMallasState = {
  activeViewSegment: 'bloques',
  selectedBloque: null,
  selectedMalla: null
};

const viewMallasSlice = createSlice({
  name: 'viewMallas',
  initialState,
  reducers: {
    setActiveViewSegment: (state, action: PayloadAction<ViewSegment>) => {
      state.activeViewSegment = action.payload;
    },
    setSelectedBloque: (state, action: PayloadAction<BloqueMallaMonitored | null>) => {
      state.selectedBloque = action.payload;
    },
    setSelectedMalla: (state, action: PayloadAction<MallaMonitored | null>) => {
      state.selectedMalla = action.payload;
    },
    resetViewMallas: (state) => {
      return initialState;
    }
  }
});

export const {
  setActiveViewSegment,
  setSelectedBloque,
  setSelectedMalla,
  resetViewMallas
} = viewMallasSlice.actions;

export default viewMallasSlice.reducer;