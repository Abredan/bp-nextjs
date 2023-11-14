import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './apis/base.api';
import { rtkQueryErrorLogger } from './middlewares/rtk-query-error.middleware';
import { appConfigSlice, roleSlice, userSlice } from './slices';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';

export const store = configureStore({
  devTools: process.env.NODE_ENV! !== 'production',
  reducer: {
    config: appConfigSlice.reducer,
    roles: roleSlice.reducer,
    users: userSlice.reducer,
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
