import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
