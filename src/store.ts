import { Dispatch } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';
import { Environment } from './enums';
import { api } from './services/api'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV === Environment.Dev
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch | Dispatch<any>;
