import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import { auth } from '../../../firebaseConfig';
import { setCredentials, logout } from '../auth/authSlice';

// Define base URL
const API_BASE_URL = import.meta.env.VITE_API_URL;
const baseUrl = `${API_BASE_URL}/api/v1/tenants/`;

// Mutex to prevent multiple simultaneous token refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

// Create a base query that injects the authorization header. Used by all APIs that require authentication.
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");

    // For local dev mode - Add the user id from environment variable
    if (import.meta.env.DEV) {
      headers.set("uid", import.meta.env.VITE_USER_UID);
    }

    return headers;
  },
});

/**
 * Refresh the Firebase ID token.
 * Uses a mutex to prevent multiple simultaneous refresh attempts.
 */
async function refreshToken(): Promise<string | null> {
  // If already refreshing, wait for the existing refresh to complete
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return null;
      }
      // Force refresh the token
      const newToken = await currentUser.getIdToken(true);
      return newToken;
    } catch {
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);

  // Handle 401 Unauthorized - attempt token refresh
  if (result.error && result.error.status === 401) {
    const newToken = await refreshToken();

    if (newToken && auth.currentUser) {
      // Update the token in Redux store
      api.dispatch(setCredentials({
        token: newToken,
        user: auth.currentUser
      }));

      // Retry the original request with the new token
      result = await baseQueryWithAuth(args, api, extraOptions);
    } else {
      // Token refresh failed - log out the user
      api.dispatch(logout());
    }
  }

  return result;
};
