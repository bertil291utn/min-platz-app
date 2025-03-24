import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BLOQUE_KEY_LOCAL_STORAGE } from '../../helpers/bloquesConstant';
import { Bloque } from '../../interfaces/Bloque';

export const INITIAL_BLOQUE: Bloque = {
  id: 1,
  location: '',
  name: '',
  description: '',
  numCamas: 0,
  numCuadrantes: 0,
  numCuadrosPerCama: 0,
  placasDetails: [], // Add new field
  archived: false
};

interface BloqueInfoState {
  bloques: Bloque[];
  loading: boolean;
  error: string | null;
}

const initialState: BloqueInfoState = {
  bloques: [],
  loading: false,
  error: null
};

// Fetch bloques from localStorage or API
export const fetchBloques = createAsyncThunk(
  'bloqueInfo/fetchBloques',
  async () => {
    const localBloques = localStorage.getItem(BLOQUE_KEY_LOCAL_STORAGE);

    if (navigator.onLine) {
      try {
        // TODO: Replace with actual database fetch call
        const response = await fetch('/api/bloques');
        const dbBloques = await response.json();
        localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(dbBloques));
        return dbBloques;
      } catch (error) {
        if (localBloques) {
          return JSON.parse(localBloques);
        }
        throw new Error('Failed to fetch bloques');
      }
    } else if (localBloques) {
      return JSON.parse(localBloques);
    }

    return [];
  }
);

const bloqueInfoSlice = createSlice({
  name: 'bloqueInfo',
  initialState,
  reducers: {
    setBloques: (state, action: PayloadAction<Bloque[]>) => {
      state.bloques = action.payload;
      localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(action.payload));
    },
    addBloque: (state, action: PayloadAction<Bloque>) => {
      const newBloque: Bloque = {
        ...action.payload,
        id: state.bloques.length + 1,
        placasDetails: action.payload.placasDetails || [], // Include placasDetails in new bloque
      };
      state.bloques.push(newBloque);
      localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(state.bloques));
    },
    removeBloque: (state, action: PayloadAction<number>) => {
      if (state.bloques.length >= 1) {
        state.bloques = state.bloques.map(bloque =>
          bloque.id === action.payload ? { ...bloque, archived: true } : bloque
        );
        localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(state.bloques));
      }
    },
    unarchiveBloque: (state, action: PayloadAction<number>) => {
      state.bloques = state.bloques.map(bloque =>
        bloque.id === action.payload ? { ...bloque, archived: false } : bloque
      );
      localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(state.bloques));
    },
    editBloque: (state, action: PayloadAction<{ id: number; updatedBloque: Bloque }>) => {
      state.bloques = state.bloques.map(bloque =>
        bloque.id === action.payload.id 
          ? { 
              ...action.payload.updatedBloque,
              id: action.payload.id,
              // If placasDetails is provided in updatedBloque, use it; otherwise keep existing or use empty array
              placasDetails: action.payload.updatedBloque.placasDetails || bloque.placasDetails || []
            } 
          : bloque
      );
      localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(state.bloques));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBloques.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBloques.fulfilled, (state, action) => {
        state.loading = false;
        state.bloques = action.payload;
      })
      .addCase(fetchBloques.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bloques';
      });
  }
});

// Selectors
export const selectAllBloques = (state: { bloqueInfo: BloqueInfoState }) => state.bloqueInfo.bloques;
export const selectArchivedBloques = (state: { bloqueInfo: BloqueInfoState }) =>
  state.bloqueInfo.bloques.filter(bloque => bloque.archived);
export const selectActiveBloques = (state: { bloqueInfo: BloqueInfoState }) =>
  state.bloqueInfo.bloques.filter(bloque => !bloque.archived);

export const { setBloques, addBloque, removeBloque, unarchiveBloque, editBloque } = bloqueInfoSlice.actions;
export default bloqueInfoSlice.reducer;
