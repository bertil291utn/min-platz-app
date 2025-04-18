import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { USER_AUTH } from '../../helpers/AuthConst';
import { verifyToken, isTokenExpired, clearAuth } from '../../services/authService';

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
    const userAuth = localStorage.getItem(USER_AUTH);
    let isAuthenticated = false;

    if (userAuth) {
      try {
        const authData = JSON.parse(userAuth);

        // Verify JWT token
        if (authData.token && !isTokenExpired(authData.token)) {
          const payload = await verifyToken(authData.token);
          if (payload && payload.ci === authData.ci) {
            isAuthenticated = true;
          }
        }

        if (!isAuthenticated) {
          // Token invalid or expired, clean up
          clearAuth()
        }
      } catch (error) {
        // Invalid JSON or other error, clean up
        clearAuth()
      }
    }

    return { isAuthenticated };
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
      clearAuth()
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
