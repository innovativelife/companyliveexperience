import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';

// Define base URL
const API_BASE_URL = import.meta.env.VITE_API_URL;
const baseUrl = `${API_BASE_URL}/api/v1/tenants/`;

// Create a base query that injects the authorization header.  Used by all API's that require Authentication.
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    const isAuthenticated = state.auth.isAuthenticated;
    const displayName = state.auth.user?.displayName;

    console.log("Setting up header - Auth state is:");
    console.log("  - token: " + token);
    console.log("  - isAuthenticated: " + isAuthenticated);
    console.log("  - displayName: " + displayName);

    if (token) {
      console.log("Adding Authorization header");
      headers.set('Authorization', `Bearer ${token}`)
    }
    else {
      console.error("Error - Token empty");
    }

    headers.set("Content-Type", "application/json");

    // For local dev mode - Add the user id from environment variable
    if (import.meta.env.DEV) {
      headers.set("uid", import.meta.env.VITE_USER_UID);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError > = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Attempt to refresh the token
    const refreshResult = await baseQueryWithAuth('/refresh-token', api, extraOptions);

    if (refreshResult.data) {
      // ToDo - Implement Re-auth / token refresh
      console.log("Reauth not implmented");
      //   // If refresh successful, update the token in your Redux store
      //   api.dispatch(setCredentials(refreshResult.data));
      //   // Retry the original request
      //   result = await baseQueryWithAuth(args, api, extraOptions);
      // } else {
      //   // If refresh fails, log out the user
      //   api.dispatch(clearCredentials());


      //   if (result.error && (result.error.status === 401 || result.error.status === 403)) {
      //     console.warn('Unauthorized or Forbidden: Logging out user.');
      //     api.dispatch(logout()); // Dispatch logout action
      //     // ToDo: Add a global redirect here if not handled by a PrivateRoute
      //     // For example: window.location.href = '/login';
      //   }
      //   return result;
    }
  }
  return result;
};
