// src/features/auth/AuthStatus.tsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store"; // Import types
import {
  signInWithGoogle,
  signOutUser,
  setUser,
} from "../../features/auth/authSlice"; // Import auth actions/thunks
import { onAuthStateChanged } from "firebase/auth"; // Import listener
import { auth } from "../../../firebaseConfig"; // Import auth instance
import LargeButton from "../LargeButton/LargeButton";

import "./authPage.css"; // Import the CSS file

function AuthPage() {
  // Use the typed hooks
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch: AppDispatch = useDispatch();

  // Effect to listen for Firebase auth state changes (important for persistence)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Dispatch the setUser action whenever the auth state changes
      dispatch(setUser(currentUser));
      // This will update the Redux state based on the Firebase auth state
      console.log(
        "Firebase Auth State Changed:",
        currentUser ? "Signed In" : "Signed Out",
      );
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [dispatch]); // Dependency array includes dispatch

  const handleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

  if (isLoading) {
    return <p data-oid="auth-loading-message">Loading auth status...</p>;
  }

  if (error) {
    return (
      <div data-oid="auth-error">
        <p style={{ color: "red" }} data-oid="auth-error-message">
          Error: {error}
        </p>
        {/* Optionally add a retry button or clear error action */}
      </div>
    );
  }

  return (
    <div className="auth-page-container" data-oid="auth-page-container">
      {/* --- Loading State --- */}
      {isLoading && (
        <div className="loading-message" data-oid="auth-page-loading">
          <p data-oid="auth-page-loading-message">Loading...</p>
          {/* You could add a spinner icon here */}
        </div>
      )}

      {/* --- Error State --- */}
      {error && (
        <div className="error-message" data-oid="auth-page-error">
          <p data-oid="auth-page-error-title">Authentication Error:</p>
          <p data-oid="auth-page-error-message">{error}</p>
          {/* Optionally add a button to clear the error or retry */}
        </div>
      )}

      {/* --- Authenticated State (User is logged in) --- */}
      {!isLoading && !error && user ? (
        <div className="user-info" data-oid="auth-page-user-info">
          <h2 data-oid="auth-page-welcome">Welcome!</h2>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="profile-pic"
              data-oid="auth-page-profile-pic"
            />
          )}
          <p className="display-name" data-oid="auth-page-display-name">
            {user.displayName || user.email}
          </p>{" "}
          {/* Display name or email */}
          <button
            className="sign-out-button"
            onClick={handleSignOut}
            disabled={isLoading} // Disable button while signing out
            data-oid="auth-page-sign-out-button"
          >
            Sign Out
          </button>
        </div>
      ) : (
        /* --- Unauthenticated State (User is logged out) --- */
        !isLoading &&
        !error && (
          <div className="sign-in-prompt" data-oid="auth-page-sign-in">
            <h2 data-oid="auth-page-sign-in-title">Please Sign In</h2>
            <p data-oid="auth-page-sign-in-message">
              Access awesome features by signing in.
            </p>
            <LargeButton
              onClick={handleSignIn}
              label="Sign in"
              data-oid="auth-page-sign-in-button"
            />
          </div>
        )
      )}
    </div>
  );
}

export default AuthPage;
