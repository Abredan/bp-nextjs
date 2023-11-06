import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from './slices/roles.slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './apis/api';
import { rtkQueryErrorLogger } from './middlewares/rtk-query-error.middleware';

export const store = configureStore({
  devTools: process.env.NODE_ENV! !== 'production',
  reducer: {
    roles: rolesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
