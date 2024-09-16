import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
}

const initialState: NotificationState = {
  message: '',
  type: 'info',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
        state.message = "";
        state.type = "info";    
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
