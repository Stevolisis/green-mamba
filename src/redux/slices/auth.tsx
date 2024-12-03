import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  jwt: string;
  userId: string;
  walletAddress: string;
}

const initialState: ToastState = {
  jwt: '',
  userId: '',
  walletAddress: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
    },
    setWalletAddress: (state, { payload }: PayloadAction<string>) => {
        state.walletAddress = payload;
    },
    setJwt: (state, { payload }: PayloadAction<string>) => {
        state.jwt = payload;
    },
  },
});

export const { setUserId, setWalletAddress, setJwt } = authSlice.actions;
export default authSlice.reducer;
