import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Disease } from '../../interfaces/Diseases';
import { BloqueMonPlaca, PlacaType, PlacasSegment, PlacaMonitored, DiseaseInPlaca } from '../../interfaces/PlacaMonitoring';
import { CURRENT_DATE_UTC5, CURRENT_WEEK_NUMBER } from '../../helpers/regularHelper';
import { Bloque } from '../../interfaces/Bloque';

export const STORE_PLACAS_MONITORED = 'placas-monitored';

interface PlacasMonitoringState {
  activeSegment: PlacasSegment;
  selectedBloque: Bloque | null;
  selectedType: PlacaType | null;
  selectedPlacaNumber: number | null;
  selectedDiseases: DiseaseInPlaca[];  // Changed from selectedDisease: Disease | null
  selectedWeek: number | null;
  notes: string;
  placasMonitored: BloqueMonPlaca[];
  loading: boolean;
  error: string | null;
  isToastSavedOpen: boolean;
  isEdit: boolean;
}

const initialState: PlacasMonitoringState = {
  activeSegment: 'bloques',
  selectedBloque: null,
  selectedType: null,
  selectedPlacaNumber: null,
  selectedDiseases: [],
  selectedWeek: null,
  notes: '',
  placasMonitored: [],
  loading: false,
  error: null,
  isToastSavedOpen: false,
  isEdit: false
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
    diseases,
    notes
  }: {
    bloqueId: number;
    type: PlacaType;
    placaNumber: number;
    diseases: DiseaseInPlaca[];
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
      diseases,
      notes
    };

    const placaIndex = updatedPlacas[bloqueIndex].placas.findIndex(
      p => p.id === placaNumber && p.type === type
    );

    if (placaIndex === -1) {
      updatedPlacas[bloqueIndex].placas.push(placa);
    } else {
      updatedPlacas[bloqueIndex].placas[placaIndex] = placa;
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
    
    setSelectedWeek: (state, action: PayloadAction<number | null>) => {
      state.selectedWeek = action.payload;
    },
   
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    
    setSelectedDiseases: (state, action: PayloadAction<DiseaseInPlaca[]>) => {
      state.selectedDiseases = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    resetForm: (state) => {
      state.notes = '';
      state.selectedDiseases = [];
      state.isEdit = false;
      state.loading = false;
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
      })
      .addCase(updatePlacaMonitoring.rejected, (state, action) => {
        state.loading = false;
      });
  }
});

export const {
  setActiveSegment,
  setSelectedBloque,
  setSelectedType,
  setSelectedPlacaNumber,
  setSelectedWeek,
  setNotes,
  resetForm,
  setSelectedDiseases,
  setIsEdit
} = placasMonitoringSlice.actions;

export default placasMonitoringSlice.reducer;