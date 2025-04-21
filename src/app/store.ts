import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import tenantReducer from '../features/tenants/tenantSlice'

export const store = configureStore({
  reducer: {
    userReducer,
    tenantReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
