// store.js
 
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slice/authSlice';
import eventReducer from '../store/slice/eventSlice';
 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    event:eventReducer,
  },
});