import { configureStore } from '@reduxjs/toolkit';

import tenantReducer from '../features/tenants/tenantSlice';
import { tenantApi } from '../features/tenants/tenantAPI';

import uiConfigReducer from '../features/uiConfig/uiConfigSlice';
import { uiConfigApi } from '../features/uiConfig/uiConfigAPI';

import employeeReducer from '../features/employees/employeeSlice';
import { employeesApi } from '../features/employees/employeeAPI';

import postReducer from '../features/posts/postSlice';
import { postsApi } from '../features/posts/postAPI';

import repliesReducer from '../features/replies/repliesSlice';
import { repliesApi } from '../features/replies/repliesAPI';

import reactionsReducer from '../features/reactions/reactionsSlice';
import { reactionApi } from '../features/reactions/reactionsAPI';

import { publicTenantApi } from '../features/tenants/publicTenantApi';

import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    [tenantApi.reducerPath]: tenantApi.reducer,
    ui: uiConfigReducer,
    [uiConfigApi.reducerPath]: uiConfigApi.reducer,
    employee: employeeReducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    post: postReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    replies: repliesReducer,
    [repliesApi.reducerPath]: repliesApi.reducer,
    reactions: reactionsReducer,
    [reactionApi.reducerPath]: reactionApi.reducer,
    auth: authReducer,
    [publicTenantApi.reducerPath]: publicTenantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tenantApi.middleware,
      uiConfigApi.middleware,
      employeesApi.middleware,
      postsApi.middleware,
      repliesApi.middleware,
      reactionApi.middleware,
      publicTenantApi.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ReturnType<AppDispatch>;