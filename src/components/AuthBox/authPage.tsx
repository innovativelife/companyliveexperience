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
    return <p data-oid="j6r-qzi">Loading auth status...</p>;
  }

  if (error) {
    return (
      <div data-oid="d814e4.">
        <p style={{ color: "red" }} data-oid="9w.30.g">
          Error: {error}
        </p>
        {/* Optionally add a retry button or clear error action */}
      </div>
    );
  }

  return (
    <div className="auth-page-container" data-oid="s0atu6k">
      {/* --- Loading State --- */}
      {isLoading && (
        <div className="loading-message" data-oid="whnbt6i">
          <p data-oid="2nq0sui">Loading...</p>
          {/* You could add a spinner icon here */}
        </div>
      )}

      {/* --- Error State --- */}
      {error && (
        <div className="error-message" data-oid="r5hknxn">
          <p data-oid="020c12v">Authentication Error:</p>
          <p data-oid="uth.dm.">{error}</p>
          {/* Optionally add a button to clear the error or retry */}
        </div>
      )}

      {/* --- Authenticated State (User is logged in) --- */}
      {!isLoading && !error && user ? (
        <div className="user-info" data-oid="sphj1lf">
          <h2 data-oid="ertin.3">Welcome!</h2>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="profile-pic"
              data-oid="fkm68xf"
            />
          )}
          <p className="display-name" data-oid="f_vcoh0">
            {user.displayName || user.email}
          </p>{" "}
          {/* Display name or email */}
          <button
            className="sign-out-button"
            onClick={handleSignOut}
            disabled={isLoading} // Disable button while signing out
            data-oid="otsrdu7"
          >
            Sign Out
          </button>
        </div>
      ) : (
        /* --- Unauthenticated State (User is logged out) --- */
        !isLoading &&
        !error && (
          <div className="sign-in-prompt" data-oid="ee8b9sh">
            <h2 data-oid="lukx6i9">Please Sign In</h2>
            <p data-oid="934gsly">Access awesome features by signing in.</p>
            <LargeButton
              onClick={handleSignIn}
              label="Sign in"
              data-oid="elibbm3"
            />
          </div>
        )
      )}
    </div>
  );
}

export default AuthPage;
