import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig'; // Import auth and googleProvider
import { app } from '../../../firebaseConfig';
import { setCredentials, logout, setAuthLoading, setAuthError } from '../../features/auth/authSlice';
import type { RootState } from '../../app/store'; // Import RootState for useSelector

// import LargeButton from "../LargeButton/LargeButton";

import "./authPage.css"; // Import the CSS file

// Initialize Firebase Auth
const authenticator = getAuth(app);

const AuthPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, status, error, token } = useSelector((state: RootState) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    console.log("UseEffect to check if user is authenticated in AuthPage:");
    console.log("  - token: " + token);
    console.log("  - isAuthenticated: " + isAuthenticated);
    console.log("  - displayName: " + user?.displayName);

    if (isAuthenticated) {
      console.log("Authenticated - Redirect home");
      // navigate('/home'); // Redirect to home page
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSignIn = async () => {
    dispatch(setAuthLoading());
    try {
      // ToDo: Need to fix this - get tenantId from the URL and store in state
      auth.tenantId = 'New-Tenant-999-rybgj';
      console.log(`Attempting to sign in with tenant: ${auth.tenantId}`);

      let googleProvider= new GoogleAuthProvider();

      const result = await signInWithPopup(authenticator, googleProvider);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

      // Dispatch setCredentials with token and the Firebase User object
      // The prepare callback in authSlice will handle serialization
      dispatch(setCredentials({ token: idToken, user: firebaseUser }));

      // Redirection handled by useEffect above
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      dispatch(setAuthError(err.message || "Failed to sign in with Google."));
    }
  };

  const handleLogout = async () => {
    dispatch(setAuthLoading());
    try {
      await signOut(auth);
      dispatch(logout()); // Clear state and localStorage
      navigate('/login'); // Redirect to login page
    } catch (err: any) {
      console.error("Logout error:", err);
      dispatch(setAuthError(err.message || "Failed to log out."));
    }
  };

  if (status === 'loading') {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          {isAuthenticated ? `Welcome, ${user?.displayName || user?.email || 'User'}!` : 'Sign In'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center space-x-2"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );

  // return (
  //   <div className="auth-page-container" data-oid="auth-page-container">
  //     {/* --- Loading State --- */}
  //     {isLoading && (
  //       <div className="loading-message" data-oid="auth-page-loading">
  //         <p data-oid="auth-page-loading-message">Loading...</p>
  //         {/* You could add a spinner icon here */}
  //       </div>
  //     )}

  //     {/* --- Error State --- */}
  //     {error && (
  //       <div className="error-message" data-oid="auth-page-error">
  //         <p data-oid="auth-page-error-title">Authentication Error:</p>
  //         <p data-oid="auth-page-error-message">{error}</p>
  //         {/* Optionally add a button to clear the error or retry */}
  //       </div>
  //     )}

  //     {/* --- Authenticated State (User is logged in) --- */}
  //     {!isLoading && !error && user ? (
  //       <div className="user-info" data-oid="auth-page-user-info">
  //         <h2 data-oid="auth-page-welcome">Welcome!</h2>
  //         {user.photoURL && (
  //           <img
  //             src={user.photoURL}
  //             alt="Profile"
  //             className="profile-pic"
  //             data-oid="auth-page-profile-pic"
  //           />
  //         )}
  //         <p className="display-name" data-oid="auth-page-display-name">
  //           {user.displayName || user.email}
  //         </p>{" "}
  //         {/* Display name or email */}
  //         <button
  //           className="sign-out-button"
  //           onClick={handleSignOut}
  //           disabled={isLoading} // Disable button while signing out
  //           data-oid="auth-page-sign-out-button"
  //         >
  //           Sign Out
  //         </button>
  //       </div>
  //     ) : (
  //       /* --- Unauthenticated State (User is logged out) --- */
  //       !isLoading &&
  //       !error && (
  //         <div className="sign-in-prompt" data-oid="auth-page-sign-in">
  //           <h2 data-oid="auth-page-sign-in-title">Please Sign In</h2>
  //           <p data-oid="auth-page-sign-in-message">
  //             Access awesome features by signing in.
  //           </p>
  //           <LargeButton
  //             onClick={handleSignIn}
  //             label="Sign in"
  //             data-oid="auth-page-sign-in-button"
  //           />
  //         </div>
  //       )
  //     )}
  //   </div>
  // );

}

export default AuthPage;
