import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User';
import { USER_SET } from '../../helpers/AuthConst';

const initialState: { user: User | null } = {
  user: null
};

const userSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      // Store in localStorage
      localStorage.setItem(USER_SET, JSON.stringify(action.payload));
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update localStorage
        localStorage.setItem(USER_SET, JSON.stringify(state.user));
      }
    },
    cleanUser: (state) => {
      state.user = null;
      // Remove from localStorage
      localStorage.removeItem(USER_SET);
    },
  },
});

export const { setUser, updateUser, cleanUser } = userSlice.actions;
export default userSlice.reducer;