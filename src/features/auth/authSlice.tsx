// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider } from "../../../firebaseConfig"; // Import your auth and provider instances
import { AuthType } from "./authTypes";
import { useNavigate } from "react-router-dom";

// Define the shape of our auth state
// interface AuthType {
//   user: User | null; // Firebase User object or null if logged out
//   isLoading: boolean;
//   error: string | null;
// }

// Set the initial state
const initialState: AuthType = {
  user: null,
  employeeUID: null,
  tenantId: null,
  isLoading: false,
  error: null,
};

const navigate = useNavigate();

// --- Async Thunks for Authentication ---

// Thunk for signing in with Google
export const signInWithGoogle = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "auth/signInWithGoogle", // Action type prefix
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info.
      const user = result.user;
      // You can also get the ID token here if needed for your backend
      // const idToken = await user.getIdToken();
      console.log("Successfully signed in:", user.displayName);
      return user; // Return the user object on success
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);

      console.error("Google Sign-In Error:", errorCode, errorMessage);
      return rejectWithValue(errorMessage); // Return the error message on failure
    }
  },
);

// Thunk for signing out
export const signOutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/signOut", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    console.log("Successfully signed out");
  } catch (error: any) {
    console.error("Sign Out Error:", error.message);
    return rejectWithValue(error.message);
  }
});

// Optional: Thunk to check auth state on app load (using onAuthStateChanged listener)
// This is crucial for handling initial load and persistence!
// You would typically set up the listener outside a thunk and dispatch actions
// based on its events, but a thunk can be used to *start* that process or handle the *initial* state check.
// For simplicity in this example, we'll just show the sign-in/out thunks.
// A real app would need an effect/listener setup in the main app component.

// --- Authentication Slice Definition ---

const authSlice = createSlice({
  name: "auth", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to set the user directly (useful for onAuthStateChanged listener)
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false; // Stop loading once user state is determined
      state.error = null; // Clear any previous errors
    },
    // Reducer to clear error state
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  // Extra reducers for handling async thunk states (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      // --- signInWithGoogle ---
      .addCase(signInWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // payload is the User object returned by the thunk

        //Cant really test if this works
        state.employeeUID = state.user.uid;
        state.tenantId = state.user.tenantId;
        navigate('/home');
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Google Sign-In failed"; // payload is the rejectValue
        state.user = null; // Ensure user is null on failure
      })
      // --- signOutUser ---
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null; // Clear the user on successful sign out
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Sign Out failed";
        // Note: Firebase's signOut doesn't typically fail in a way
        // that leaves the user partially signed in, but handling is good practice.
      });
  },
});

// Export the reducer and actions
export const { setUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
