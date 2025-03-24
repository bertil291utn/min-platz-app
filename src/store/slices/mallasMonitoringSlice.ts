import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MallasSegment, MallaMonitored, BloqueMallaMonitored, DiseaseStatus } from '../../interfaces/MallasMonitoring';
import { CURRENT_DATE_UTC5, CURRENT_WEEK_NUMBER } from '../../helpers/regularHelper';

const STORE_MALLAS_MONITORED = 'mallas-monitored';

interface MallasMonitoringState {
  activeSegment: MallasSegment;
  selectedVariety: string | null;
  selectedDiseases: DiseaseStatus[];
  observations: string;
  mallasMonitored: BloqueMallaMonitored[];
  loading: boolean;
  error: string | null;
  isToastSavedOpen: boolean;
}

const initialState: MallasMonitoringState = {
  activeSegment: 'bloques',
  selectedVariety: null,
  selectedDiseases: [],
  observations: '',
  mallasMonitored: [],
  loading: false,
  error: null,
  isToastSavedOpen: false
};

export const fetchMallasMonitored = createAsyncThunk(
  'mallasMonitoring/fetchMallasMonitored',
  async () => {
    const stored = localStorage.getItem(STORE_MALLAS_MONITORED);
    return stored ? JSON.parse(stored) : [];
  }
);

export const updateMallaMonitoring = createAsyncThunk(
  'mallasMonitoring/updateMalla',
  async ({ 
    bloqueId,
    variety,
    diseases,
    observations
  }: {
    bloqueId: number;
    variety: string;
    diseases: DiseaseStatus[];
    observations: string;
  }, { getState }) => {
    const state = getState() as { mallasMonitoring: MallasMonitoringState };
    const updatedMallas = [...state.mallasMonitoring.mallasMonitored];
    
    const bloqueIndex = updatedMallas.findIndex(b => 
      b.id === bloqueId && b.weekNumber === CURRENT_WEEK_NUMBER
    );

    if (bloqueIndex === -1) {
      const newBloque: BloqueMallaMonitored = {
        id: bloqueId,
        name: `Bloque ${bloqueId}`,
        dateMonitoring: CURRENT_DATE_UTC5.toISOString(),
        weekNumber: CURRENT_WEEK_NUMBER,
        mallas: []
      };
      updatedMallas.push(newBloque);
    }

    const mallaMonitored: MallaMonitored = {
      id: Date.now(),
      bloqueId,
      dateMonitoring: CURRENT_DATE_UTC5.toISOString(),
      weekNumber: CURRENT_WEEK_NUMBER,
      variety,
      diseases,
      observations
    };

    if (bloqueIndex === -1) {
      updatedMallas[updatedMallas.length - 1].mallas.push(mallaMonitored);
    } else {
      updatedMallas[bloqueIndex].mallas.push(mallaMonitored);
    }

    localStorage.setItem(STORE_MALLAS_MONITORED, JSON.stringify(updatedMallas));
    return updatedMallas;
  }
);

const mallasMonitoringSlice = createSlice({
  name: 'mallasMonitoring',
  initialState,
  reducers: {
    setActiveSegment: (state, action: PayloadAction<MallasSegment>) => {
      state.activeSegment = action.payload;
    },
    setSelectedVariety: (state, action: PayloadAction<string | null>) => {
      state.selectedVariety = action.payload;
    },
    setSelectedDiseases: (state, action: PayloadAction<DiseaseStatus[]>) => {
      state.selectedDiseases = action.payload;
    },
    updateDiseaseStatus: (state, action: PayloadAction<{ 
      diseaseId: number; 
      status: 'vivo' | 'muerto' 
    }>) => {
      const { diseaseId, status } = action.payload;
      state.selectedDiseases = state.selectedDiseases.map(disease =>
        disease.id === diseaseId ? { ...disease, status } : disease
      );
    },
    updateDiseaseCount: (state, action: PayloadAction<{ 
      diseaseId: number; 
      count: number 
    }>) => {
      const { diseaseId, count } = action.payload;
      state.selectedDiseases = state.selectedDiseases.map(disease =>
        disease.id === diseaseId ? { ...disease, count } : disease
      );
    },
    setObservations: (state, action: PayloadAction<string>) => {
      state.observations = action.payload;
    },
    resetForm: (state) => {
      state.selectedDiseases = [];
      state.observations = '';
      state.selectedVariety = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMallasMonitored.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMallasMonitored.fulfilled, (state, action) => {
        state.loading = false;
        state.mallasMonitored = action.payload;
      })
      .addCase(updateMallaMonitoring.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMallaMonitoring.fulfilled, (state, action) => {
        state.loading = false;
        state.mallasMonitored = action.payload;
        state.isToastSavedOpen = true;
      });
  }
});

export const {
  setActiveSegment,
  setSelectedVariety,
  setSelectedDiseases,
  updateDiseaseStatus,
  updateDiseaseCount,
  setObservations,
  resetForm
} = mallasMonitoringSlice.actions;

export default mallasMonitoringSlice.reducer;