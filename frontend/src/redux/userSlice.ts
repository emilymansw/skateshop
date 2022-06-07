import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserPayloadData {
  userEmail: string;
  role: string;
}

interface IUserStateData {
  userEmail: string | null;
  role: string | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: { userEmail: null, role: null },
  reducers: {
    setCurrentUser: (
      state: IUserStateData,
      action: PayloadAction<IUserPayloadData>
    ) => {
      state.userEmail = action.payload.userEmail;
      state.role = action.payload.role;
    },
    clearCurrentUser: (state) => {
      state.userEmail = null;
      state.role = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
