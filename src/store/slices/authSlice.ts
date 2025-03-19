import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  USER_AUTH } from '../../helpers/AuthConst';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null
};

// Check if user is authenticated from localStorage
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async () => {
    // Check if user auth exists in local storage
    const userAuth = localStorage.getItem(USER_AUTH);

    let isAuthenticated = false;
    let expertUser = false;

    if (userAuth) {
      try {
        const authData = JSON.parse(userAuth);
        const now = new Date().getTime();

        // Check if token is still valid (not expired)
        if (authData.expiry && authData.expiry > now) {
          isAuthenticated = true;
        } else {
          // Token expired, clean up
          localStorage.removeItem(USER_AUTH);
        }
      } catch (error) {
        // Invalid JSON, clean up
        localStorage.removeItem(USER_AUTH);
      }
    }


    return { isAuthenticated, expertUser };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem(USER_AUTH);
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to check auth status';
      });
  }
});

export const { setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;
