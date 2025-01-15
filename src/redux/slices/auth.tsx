import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  isWalletConnected: boolean;
  userId: string;
  walletAddress: string;
}

const initialState: ToastState = {
  isWalletConnected: false,
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
    setIsWalletConnected: (state, { payload }: PayloadAction<boolean>) => {
        state.isWalletConnected = payload;
    },
  },
});

export const { setUserId, setWalletAddress, setIsWalletConnected } = authSlice.actions;
export default authSlice.reducer;
