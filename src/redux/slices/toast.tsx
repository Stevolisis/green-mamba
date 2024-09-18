import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

const initialState: ToastState = {
  message: '',
  type: 'info',
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
        state.type = "info";    
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
