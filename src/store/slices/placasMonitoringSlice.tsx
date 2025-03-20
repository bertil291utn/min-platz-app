import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Disease } from '../../interfaces/Diseases';
import { BloqueMonPlaca, PlacaType, PlacasSegment, PlacaMonitored } from '../../interfaces/PlacaMonitoring';
import { CURRENT_DATE_UTC5, CURRENT_WEEK_NUMBER } from '../../helpers/regularHelper';
import { Bloque } from '../../interfaces/Bloque';

const STORE_PLACAS_MONITORED = 'placas-monitored';

interface PlacasMonitoringState {
  activeSegment: PlacasSegment;
  selectedBloque: Bloque | null;
  selectedType: PlacaType | null;
  selectedPlacaNumber: number | null;
  selectedDisease: Disease | null;
  selectedWeek: number | null;
  count: number;
  notes: string;
  placasMonitored: BloqueMonPlaca[];
  loading: boolean;
  error: string | null;
  isToastSavedOpen: boolean;
}

const initialState: PlacasMonitoringState = {
  activeSegment: 'bloques',
  selectedBloque: null,
  selectedType: null,
  selectedPlacaNumber: null,
  selectedDisease: null,
  selectedWeek: null,
  count: 0,
  notes: '',
  placasMonitored: [],
  loading: false,
  error: null,
  isToastSavedOpen: false
};

export const fetchPlacasMonitored = createAsyncThunk(
  'placasMonitoring/fetchPlacasMonitored',
  async () => {
    const stored = localStorage.getItem(STORE_PLACAS_MONITORED);
    return stored ? JSON.parse(stored) : [];
  }
);

export const updatePlacaMonitoring = createAsyncThunk(
  'placasMonitoring/updatePlaca',
  async ({
    bloqueId,
    type,
    placaNumber,
    disease,
    count,
    notes
  }: {
    bloqueId: number;
    type: PlacaType;
    placaNumber: number;
    disease: Disease;
    count: number;
    notes: string;
  }, { getState }) => {
    const state = getState() as { placasMonitoring: PlacasMonitoringState };
    const updatedPlacas = [...state.placasMonitoring.placasMonitored];

    let bloqueIndex = updatedPlacas.findIndex(b =>
      b.id === bloqueId && b.weekNumber === CURRENT_WEEK_NUMBER
    );

    if (bloqueIndex === -1) {
      const newBloque: BloqueMonPlaca = {
        id: bloqueId,
        name: `Bloque ${bloqueId}`,
        dateMonitoring: CURRENT_DATE_UTC5.toISOString(),
        weekNumber: CURRENT_WEEK_NUMBER,
        placas: []
      };
      updatedPlacas.push(newBloque);
      bloqueIndex = updatedPlacas.length - 1;
    }

    const placa: PlacaMonitored = {
      id: placaNumber,
      type,
      diseases: [{
        ...disease,
        count
      }],
      notes
    };

    const placaIndex = updatedPlacas[bloqueIndex].placas.findIndex(
      p => p.id === placaNumber && p.type === type
    );

    if (placaIndex === -1) {
      updatedPlacas[bloqueIndex].placas.push(placa);
    } else {
      const existingPlaca = updatedPlacas[bloqueIndex].placas[placaIndex];
      const diseaseIndex = existingPlaca.diseases.findIndex(d => d.id === disease.id);

      if (diseaseIndex === -1) {
        existingPlaca.diseases.push({ ...disease, count });
      } else {
        existingPlaca.diseases[diseaseIndex] = { ...disease, count };
      }
      existingPlaca.notes = notes;
    }

    localStorage.setItem(STORE_PLACAS_MONITORED, JSON.stringify(updatedPlacas));
    return updatedPlacas;
  }
);

const placasMonitoringSlice = createSlice({
  name: 'placasMonitoring',
  initialState,
  reducers: {
    setActiveSegment: (state, action: PayloadAction<PlacasSegment>) => {
      state.activeSegment = action.payload;
    },
    setSelectedBloque: (state, action: PayloadAction<Bloque | null>) => {
      state.selectedBloque = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<PlacaType | null>) => {
      state.selectedType = action.payload;
    },
    setSelectedPlacaNumber: (state, action: PayloadAction<number | null>) => {
      state.selectedPlacaNumber = action.payload;
    },
    setSelectedDisease: (state, action: PayloadAction<Disease | null>) => {
      state.selectedDisease = action.payload;
    },
    setSelectedWeek: (state, action: PayloadAction<number | null>) => {
      state.selectedWeek = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    resetForm: (state) => {
      state.count = 0;
      state.notes = '';
      state.selectedDisease = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlacasMonitored.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlacasMonitored.fulfilled, (state, action) => {
        state.loading = false;
        state.placasMonitored = action.payload;
      })
      .addCase(updatePlacaMonitoring.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlacaMonitoring.fulfilled, (state, action) => {
        state.loading = false;
        state.placasMonitored = action.payload;
        state.isToastSavedOpen = true;
      });
  }
});

export const {
  setActiveSegment,
  setSelectedBloque,
  setSelectedType,
  setSelectedPlacaNumber,
  setSelectedDisease,
  setSelectedWeek,
  setCount,
  setNotes,
  resetForm
} = placasMonitoringSlice.actions;

export default placasMonitoringSlice.reducer;