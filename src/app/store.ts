import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import tenantReducer from '../features/tenants/tenantSlice'
import uiConfigReducer from '../features/uiConfig/uiConfigSlice'
import employeeReducer from '../features/employees/employeeSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    tenant: tenantReducer,
    ui: uiConfigReducer,
    employee: employeeReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
