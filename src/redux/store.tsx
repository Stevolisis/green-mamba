import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import profileSlice from './slices/profile';
import counterSlice from './slices/counter';
import chart from './slices/chart';


const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ["counter"]
}

const combinedReducers=combineReducers({
  counter: counterSlice,
  profile: profileSlice,
  charts: chart,
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