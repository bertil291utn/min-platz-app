import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Bloque, SegmentBloque, SegmentViewBloque } from '../../interfaces/Bloque';
import { Disease } from '../../interfaces/Diseases';
import { BloqueMonitored, CamaMonitored, CuadroMonitored } from '../../interfaces/Monitoring';
import { STORE_MONITORED_VAR } from '../../helpers/bloquesConstant';
import { CURRENT_DATE_UTC5, CURRENT_WEEK_NUMBER, getWeekNumber } from '../../helpers/regularHelper';

interface MonitoringBloqueState {
  selectedBloque: Bloque | undefined;
  selectedCuadro: number | undefined;
  selectedCama: number;
  selectedWeek: number | undefined;
  selectedDiseases: Disease[];
  selectedCuadros: CuadroMonitored[];
  activeSegment: SegmentBloque;
  activeViewSegment: SegmentViewBloque;
  isOnline: boolean;
  bloquesMonitored: BloqueMonitored[];
  IsToastSavedOpen: boolean;
  loading: boolean;
  error: string | null;
  isEdit: boolean;
}

const initialState: MonitoringBloqueState = {
  selectedBloque: undefined,
  selectedCuadro: undefined,
  selectedCama: 0,
  selectedWeek: undefined,
  selectedDiseases: [],
  selectedCuadros: [],
  activeSegment: 'camas',
  activeViewSegment: 'bloques',
  isOnline: navigator.onLine,
  bloquesMonitored: [],
  IsToastSavedOpen: false,
  loading: false,
  error: null,
  isEdit: false
};

// Fetch monitored bloques from localStorage or API
export const fetchMonitoredBloques = createAsyncThunk(
  'monitoringBloque/fetchMonitoredBloques',
  async () => {
    const localBloques = localStorage.getItem(STORE_MONITORED_VAR);

    if (navigator.onLine) {
      try {
        // TODO: Replace with actual database fetch call
        const response = await fetch('/api/monitored-bloques');
        const dbBloques = await response.json();
        localStorage.setItem(STORE_MONITORED_VAR, JSON.stringify(dbBloques));
        return dbBloques;
      } catch (error) {
        if (localBloques) {
          return JSON.parse(localBloques);
        }
        throw new Error('Failed to fetch monitored bloques');
      }
    } else if (localBloques) {
      return JSON.parse(localBloques);
    }

    return [];
  }
);

// Update monitoring data
export const updateMonitoringData = createAsyncThunk(
  'monitoringBloque/updateMonitoringData',
  async ({ bloqueId, camaId, newCuadro, customWeek }: { bloqueId: number, camaId: number, newCuadro: CuadroMonitored, customWeek: number }, { getState }) => {
    const state = getState() as { monitoringBloque: MonitoringBloqueState };

    // Create a new array of bloques
    let updatedBloques = [...state.monitoringBloque.bloquesMonitored];
    const weekNumber = customWeek || CURRENT_WEEK_NUMBER
    // Find bloque index
    let bloqueIndex = updatedBloques.findIndex(b =>
      b.weekNumber === weekNumber && b.id === bloqueId
    );

    // If no bloque found, create a new one
    if (bloqueIndex === -1) {
      const newBloque = {
        id: bloqueId,
        name: `Bloque ${bloqueId}`,
        dateMonitoring: CURRENT_DATE_UTC5.toISOString(),
        weekNumber,
        camas: []
      };
      updatedBloques = [...updatedBloques, newBloque];
      bloqueIndex = updatedBloques.length - 1;
    }

    // Create a new bloque object
    const currentBloque = { ...updatedBloques[bloqueIndex] };

    // Find cama
    let camaIndex = currentBloque.camas.findIndex(c => c.id === camaId);

    // If no cama found, create a new one
    if (camaIndex === -1) {
      const newCama = {
        id: camaId,
        name: `Cama ${camaId}`,
        cuadros: []
      };
      currentBloque.camas = [...currentBloque.camas, newCama];
      camaIndex = currentBloque.camas.length - 1;
    }

    // Create new cama object
    const updatedCama = { ...currentBloque.camas[camaIndex] };

    // Update cuadros
    const cuadroIndex = updatedCama.cuadros.findIndex(c => c.id === newCuadro.id);
    if (cuadroIndex !== -1) {
      updatedCama.cuadros = updatedCama.cuadros.map(c =>
        c.id === newCuadro.id ? { ...newCuadro } : c
      );
    } else {
      updatedCama.cuadros = [...updatedCama.cuadros, { ...newCuadro }];
    }

    // Update the cama in the bloque
    currentBloque.camas = currentBloque.camas.map((c, i) =>
      i === camaIndex ? updatedCama : c
    );

    // Update the bloque in the bloques array
    updatedBloques = updatedBloques.map((b, i) =>
      i === bloqueIndex ? currentBloque : b
    );

    // Update local storage
    localStorage.setItem(STORE_MONITORED_VAR, JSON.stringify(updatedBloques));

    // If online, sync with database
    if (state.monitoringBloque.isOnline) {
      try {
        await updateDatabaseMonitoring(bloqueId, camaId, newCuadro);
      } catch (error) {
        console.error('Failed to sync with database:', error);
      }
    }

    return updatedBloques;
  }
);

// Sync with database
export const syncWithDatabase = createAsyncThunk(
  'monitoringBloque/syncWithDatabase',
  async (_, { getState }) => {
    const state = getState() as { monitoringBloque: MonitoringBloqueState };

    if (!state.monitoringBloque.isOnline) {
      throw new Error('Cannot sync while offline');
    }

    try {
      // Here you would implement your database sync logic
      const response = await fetch('/api/monitoring/sync', {
        method: 'POST',
        body: JSON.stringify(state.monitoringBloque.bloquesMonitored)
      });
      const updatedData = await response.json();
      localStorage.setItem(STORE_MONITORED_VAR, JSON.stringify(updatedData));
      return updatedData;
    } catch (error) {
      throw new Error('Failed to sync with database');
    }
  }
);

const monitoringBloqueSlice = createSlice({
  name: 'monitoringBloque',
  initialState,
  reducers: {
    setActiveSegment: (state, action: PayloadAction<SegmentBloque>) => {
      state.activeSegment = action.payload;
    },
    setActiveViewSegment: (state, action: PayloadAction<SegmentViewBloque>) => {
      state.activeViewSegment = action.payload;
    },
    setSelectedBloque: (state, action: PayloadAction<Bloque | undefined>) => {
      state.selectedBloque = action.payload;
    },
    setSelectedCuadro: (state, action: PayloadAction<number | undefined>) => {
      state.selectedCuadro = action.payload;
    },
    setSelectedCama: (state, action: PayloadAction<number>) => {
      state.selectedCama = action.payload;
    },
    setSelectedWeek: (state, action: PayloadAction<number | undefined>) => {
      state.selectedWeek = action.payload;
    },
    setSelectedDiseases: (state, action: PayloadAction<Disease[]>) => {
      state.selectedDiseases = action.payload;
    },
    setSelectedCuadros: (state, action: PayloadAction<CuadroMonitored[]>) => {
      state.selectedCuadros = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    resetForm: (state) => {
      state.selectedDiseases = [];
      state.selectedCuadros = [];
      state.isEdit = false;
      state.loading = false;
    },
    setIsOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setIsToastSavedOpen: (state, action: PayloadAction<boolean>) => {
      state.IsToastSavedOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchMonitoredBloques
      .addCase(fetchMonitoredBloques.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonitoredBloques.fulfilled, (state, action) => {
        state.loading = false;
        state.bloquesMonitored = action.payload;
      })
      .addCase(fetchMonitoredBloques.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch monitored bloques';
      })

      // updateMonitoringData
      .addCase(updateMonitoringData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMonitoringData.fulfilled, (state, action) => {
        state.loading = false;
        state.bloquesMonitored = action.payload;
        state.IsToastSavedOpen = true;
      })
      .addCase(updateMonitoringData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update monitoring data';
      })

      // syncWithDatabase
      .addCase(syncWithDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncWithDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.bloquesMonitored = action.payload;
      })
      .addCase(syncWithDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to sync with database';
      });
  }
});

export const {
  setActiveSegment,
  setActiveViewSegment,
  setSelectedBloque,
  setSelectedCuadro,
  setSelectedCama,
  setSelectedWeek,
  setSelectedDiseases,
  setSelectedCuadros,
  resetForm,
  setIsEdit,
  setIsOnline,
  setIsToastSavedOpen
} = monitoringBloqueSlice.actions;

export default monitoringBloqueSlice.reducer;

// Helper function for database update
const updateDatabaseMonitoring = async (bloqueId: number, camaId: number, newCuadro: CuadroMonitored) => {
  // Implement your API call here
  const response = await fetch('/api/monitoring/update', {
    method: 'POST',
    body: JSON.stringify({ bloqueId, camaId, newCuadro })
  });
  if (!response.ok) {
    throw new Error('Failed to update database');
  }
  return await response.json();
};
