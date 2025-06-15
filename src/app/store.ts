import tenantReducer from '../features/tenants/tenantSlice';
import uiConfigReducer from '../features/uiConfig/uiConfigSlice';
import employeeReducer from '../features/employees/employeeSlice';
import postReducer from '../features/posts/postSlice';
import repliesReducer from '../features/replies/repliesSlice';
import { postsApi } from '../services/postAPI';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; 

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    ui: uiConfigReducer,
    employee: employeeReducer,
    post: postReducer,
    postsApi: postsApi.reducer,
    replies: repliesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
