import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info' | 'neutral';
}

const initialState: ToastState = {
  message: '',
  type: 'neutral',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideToast: (state) => {
        state.message = "";
        state.type = "neutral";    
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
