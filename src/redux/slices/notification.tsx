import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type notificationItem = {
    heading: string;
    type: "message" | "announcement" | "gift";
    message: string;
    read: boolean;
}
interface ToastState {
  notifications: notificationItem[];
  unReadNotifications: number;
  visible: boolean;
}

const initialState: ToastState = {
  notifications: [],
  unReadNotifications: 0,
  visible: false
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<{ notifications: notificationItem[] }>) => {
      state.notifications = action.payload.notifications;
      const unRead = action.payload.notifications.filter((messages)=> messages.read === false);
      state.unReadNotifications = unRead.length;
    },
    setVisibility: (state,{ payload }: PayloadAction<boolean>) => {
        state.visible = payload;    
    },
  },
});

export const { setNotification, setVisibility } = notificationSlice.actions;
export default notificationSlice.reducer;
