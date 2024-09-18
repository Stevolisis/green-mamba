import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type notificationItem = {
    heading: string;
    type: "message" | "announcement" | "gift";
    message: string;
    read: boolean;
    createdAt: number;
};

interface ToastState {
  notifications: notificationItem[];
  unReadNotifications: number;
  visible: boolean;
}

const initialState: ToastState = {
  notifications: [],
  unReadNotifications: 0,
  visible: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, { payload }: PayloadAction<notificationItem[]>) => {
      state.notifications = payload;
      const unRead = payload.filter((message) => message.read === false);
      state.unReadNotifications = unRead.length;
    },
    setVisibility: (state, { payload }: PayloadAction<boolean>) => {
      state.visible = payload;
    },
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      state.unReadNotifications = 0; // Reset unread count
    },
  },
});

export const { setNotification, setVisibility, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
