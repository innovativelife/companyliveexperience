import { configureStore } from '@reduxjs/toolkit';
import tenantReducer from '../features/tenants/tenantSlice'
import uiConfigReducer from '../features/uiConfig/uiConfigSlice'
import employeeReducer from '../features/employees/employeeSlice'
import postReducer from '../features/posts/postSlice'

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    ui: uiConfigReducer,
    employee: employeeReducer,
    post: postReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
