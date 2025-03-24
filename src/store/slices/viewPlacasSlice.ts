import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BloqueMonPlaca, PlacaMonitored } from '../../interfaces/PlacaMonitoring';

type ViewSegment = 'bloques' | 'placas' | 'details';

interface ViewPlacasState {
  activeViewSegment: ViewSegment;
  selectedBloque: BloqueMonPlaca | null;
  selectedPlaca: PlacaMonitored | null;
}

const initialState: ViewPlacasState = {
  activeViewSegment: 'bloques',
  selectedBloque: null,
  selectedPlaca: null
};

const viewPlacasSlice = createSlice({
  name: 'viewPlacas',
  initialState,
  reducers: {
    setActiveViewSegment: (state, action: PayloadAction<ViewSegment>) => {
      state.activeViewSegment = action.payload;
    },
    setSelectedBloque: (state, action: PayloadAction<BloqueMonPlaca | null>) => {
      state.selectedBloque = action.payload;
    },
    setSelectedPlaca: (state, action: PayloadAction<PlacaMonitored | null>) => {
      state.selectedPlaca = action.payload;
    },
    resetViewPlacas: (state) => {
      return initialState;
    }
  }
});

export const {
  setActiveViewSegment,
  setSelectedBloque,
  setSelectedPlaca,
  resetViewPlacas
} = viewPlacasSlice.actions;

export default viewPlacasSlice.reducer;