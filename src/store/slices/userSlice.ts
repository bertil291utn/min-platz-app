import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User';
import { USER_AUTH } from '../../helpers/AuthConst';

const initialState: { user: User | null } = {
  user: null
};

const userSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    cleanUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, updateUser, cleanUser } = userSlice.actions;
export default userSlice.reducer;