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
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQueryWithAuth(args, api, extraOptions);

  // TODO: Implement token refresh logic
  // When 401 is received:
  // 1. Attempt to refresh the Firebase token using auth.currentUser?.getIdToken(true)
  // 2. Update the token in Redux store via setCredentials()
  // 3. Retry the original request
  // 4. If refresh fails, dispatch logout() and redirect to login

  return result;
};
