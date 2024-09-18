import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import sliderSlice from './slices/slider';
import counterSlice from './slices/counter';
import chart from './slices/chart';
import table from './slices/table';
import article from './slices/article';
import toast from './slices/toast';
import notification from './slices/notification';


const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ["counter"]
}

const combinedReducers = combineReducers({
  counter: counterSlice,
  slider: sliderSlice,
  charts: chart,
  table: table,
  article: article,
  toast: toast,
  notification: notification,
});



const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;