// src/features/auth/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth'; // Import Firebase User type

// Define the serializable user data shape
export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  // Add any other user properties you explicitly need and are serializable
}

// Define the shape of the authentication state
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: UserData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Load initial state from localStorage
const loadInitialState = (): AuthState => {
  console.log("LoadInitial State:")
  const storedToken = localStorage.getItem('authToken');
  const storedUser = localStorage.getItem('authUser');
  let user: UserData | null = null;

  if (storedUser) {
    try {
      console.log("Loaded user from localStorage: " + storedUser)
      console.log("Loaded token from localStorage: " + storedToken)
      user = JSON.parse(storedUser);
    } catch (e) {
      console.error("Failed to parse stored user data:", e);
      localStorage.removeItem('authUser'); // Clear corrupted data
    }
  }

  return {
    token: storedToken,
    isAuthenticated: !!storedToken && !!user, // Check both token and user data
    user: user,
    status: 'idle',
    error: null,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set user credentials after a successful login (e.g., Google sign-in)
    // Uses a 'prepare' callback to ensure the payload is serializable
    setCredentials: {
      reducer: (state, action: PayloadAction<{ token: string; user: UserData }>) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        console.log("setCredentials/reducer - check if user is authenticated in AuthPage:");
        console.log("  - token: " + state.token);
        console.log("  - displayName: " + state.user?.displayName);

        state.status = 'succeeded';
        state.error = null;
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user)); // Store serializable user data
      },
      prepare: (payload: { token: string; user: User }) => {
        console.log("setCredentials/prepare - check if user is authenticated in AuthPage:");
        console.log("  - token: " + payload.token);
        console.log("  - displayName: " + payload.user?.displayName);

        // Transform the non-serializable Firebase User object into a serializable UserData
        const serializableUser: UserData = {
          uid: payload.user.uid,
          email: payload.user.email,
          displayName: payload.user.displayName,
          photoURL: payload.user.photoURL,
          emailVerified: payload.user.emailVerified,
        };
        return { payload: { token: payload.token, user: serializableUser } };
      },
    },
    // Action to update user details from onAuthStateChanged (Firebase User object)
    // This is crucial for handling non-serializable Firebase User objects
    setUser: {
      reducer: (state, action: PayloadAction<UserData | null>) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload; // Set isAuthenticated based on user presence
        state.status = 'succeeded';
        state.error = null;
        if (action.payload) {
          localStorage.setItem('authUser', JSON.stringify(action.payload));
        } else {
          localStorage.removeItem('authUser');
        }

        console.log("setUser - check if user is authenticated in AuthPage:");
        console.log("  - token: " + state.token);
        console.log("  - displayName: " + state.user?.displayName);
      },
      prepare: (firebaseUser: User | null) => {
        let serializableUser: UserData | null = null;
        if (firebaseUser) {
          serializableUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
          };
        }
        return { payload: serializableUser }; // Payload is now serializable UserData or null
      },
    },
    // Action for logging out
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    },
    // Action to set loading status
    setAuthLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    // Action to set error status
    setAuthError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setCredentials, setUser, logout, setAuthLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;
