import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MallasSegment, MallaMonitored, BloqueMallaMonitored, DiseaseStatus } from '../../interfaces/MallasMonitoring';
import { CURRENT_DATE_UTC5, CURRENT_WEEK_NUMBER } from '../../helpers/regularHelper';
import { STORE_MALLAS_MONITORED } from '../../helpers/bloquesConstant';

interface MallasMonitoringState {
  activeSegment: MallasSegment;
  selectedVariety: string | null;
  selectedDiseases: DiseaseStatus[];
  observations: string;
  mallasMonitored: BloqueMallaMonitored[];
  loading: boolean;
  error: string | null;
  isToastSavedOpen: boolean;
  isEdit: boolean;
}

const initialState: MallasMonitoringState = {
  activeSegment: 'bloques',
  selectedVariety: null,
  selectedDiseases: [],
  observations: '',
  mallasMonitored: [],
  loading: false,
  error: null,
  isToastSavedOpen: false,
  isEdit: false
};

export const fetchMallasMonitored = createAsyncThunk(
  'mallasMonitoring/fetchMallasMonitored',
  async () => {
    try {
      const stored = localStorage.getItem(STORE_MALLAS_MONITORED);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (error) {
      console.error("Error fetching mallas data:", error);
      return [];
    }
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
    try {
      const state = getState() as { mallasMonitoring: MallasMonitoringState };
      const weekNumber = (getState() as any).monitoringBloque.selectedWeek || CURRENT_WEEK_NUMBER;
      
      // Create a deep copy of the current state
      const updatedMallas = JSON.parse(JSON.stringify(state.mallasMonitoring.mallasMonitored));
      
      // Find the bloque for the current week
      const bloqueIndex = updatedMallas.findIndex((b: { id: number; weekNumber: number }) => 
        b.id === bloqueId && b.weekNumber === weekNumber
      );
      
      const mallaMonitored: MallaMonitored = {
        id: Date.now(),
        bloqueId,
        dateMonitoring: CURRENT_DATE_UTC5.toISOString(),
        weekNumber,
        variety,
        diseases,
        observations
      };

      if (bloqueIndex === -1) {
        // Create new bloque if it doesn't exist
        const newBloque: BloqueMallaMonitored = {
          id: bloqueId,
          name: `Bloque ${bloqueId}`,
          dateMonitoring: CURRENT_DATE_UTC5.toISOString(),
          weekNumber,
          mallas: [mallaMonitored]
        };
        updatedMallas.push(newBloque);
      } else {
        // Find existing malla for this variety
        const mallaIndex = updatedMallas[bloqueIndex].mallas.findIndex(
          (m: { variety: string }) => m.variety === variety
        );

        if (mallaIndex === -1) {
          // Add new malla
          updatedMallas[bloqueIndex].mallas.push(mallaMonitored);
        } else {
          // Update existing malla
          updatedMallas[bloqueIndex].mallas[mallaIndex] = mallaMonitored;
        }
      }

      // Save to localStorage
      localStorage.setItem(STORE_MALLAS_MONITORED, JSON.stringify(updatedMallas));
      console.log('Saved mallas data:', updatedMallas);
      
      return updatedMallas;
    } catch (error) {
      console.error('Error updating malla:', error);
      throw error;
    }
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
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    resetForm: (state) => {
      state.selectedDiseases = [];
      state.observations = '';
      state.selectedVariety = null;
      state.isEdit = false;
      state.loading = false;
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
      })
      .addCase(updateMallaMonitoring.rejected, (state, action) => {
        state.loading = false;
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
  resetForm,
  setIsEdit
} = mallasMonitoringSlice.actions;

export default mallasMonitoringSlice.reducer;