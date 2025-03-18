import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SegmentViewBloque } from '../../interfaces/Bloque';
import { BloqueMonitored, CamaMonitored, CuadroMonitored } from '../../interfaces/Monitoring';

interface ViewMonitoredState {
  activeViewSegment: SegmentViewBloque;
  selectedBloque: BloqueMonitored | null;
  selectedCama: CamaMonitored | null;
  selectedCuadro: CuadroMonitored | null;
}

const initialState: ViewMonitoredState = {
  activeViewSegment: 'bloques',
  selectedBloque: null,
  selectedCama: null,
  selectedCuadro: null
};

const viewMonitoredSlice = createSlice({
  name: 'viewMonitored',
  initialState,
  reducers: {
    setActiveViewSegment: (state, action: PayloadAction<SegmentViewBloque>) => {
      state.activeViewSegment = action.payload;
    },
    setSelectedBloque: (state, action: PayloadAction<BloqueMonitored | null>) => {
      state.selectedBloque = action.payload;
    },
    setSelectedCama: (state, action: PayloadAction<CamaMonitored | null>) => {
      state.selectedCama = action.payload;
    },
    setSelectedCuadro: (state, action: PayloadAction<CuadroMonitored | null>) => {
      state.selectedCuadro = action.payload;
    },
    resetViewMonitored: (state) => {
      state.activeViewSegment = 'bloques';
      state.selectedBloque = null;
      state.selectedCama = null;
      state.selectedCuadro = null;
    }
  }
});

export const {
  setActiveViewSegment,
  setSelectedBloque,
  setSelectedCama,
  setSelectedCuadro,
  resetViewMonitored
} = viewMonitoredSlice.actions;

export default viewMonitoredSlice.reducer;
