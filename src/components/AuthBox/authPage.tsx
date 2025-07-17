import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig"; // Import auth and googleProvider
import { app } from "../../../firebaseConfig";
import {
  setCredentials,
  logout,
  setAuthLoading,
  setAuthError,
} from "../../features/auth/authSlice";
import type { RootState } from "../../app/store"; // Import RootState for useSelector
import { useGetTenantByIdQuery } from "../../features/tenants/publicTenantApi";

import "./authPage.css"; // Import the CSS file

interface AuthWrapperProps {
  devMode: boolean;
  isAuthenticated: boolean;
}

// Initialize Firebase Auth
const authenticator = getAuth(app);

// Get tenant details from URL
const AuthPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, status, error, token } = useSelector(
    (state: RootState) => state.auth
  );
  const { tenantId } = useParams();

  const devMode = import.meta.env.DEV;
  const devUid = import.meta.env.VITE_USER_UID;

  // Redirect if already authenticated
  useEffect(() => {
    console.log("UseEffect to check if user is authenticated in AuthPage:");
    console.log("  - token: " + token);
    console.log("  - isAuthenticated: " + isAuthenticated);
    console.log("  - displayName: " + user?.displayName);

    if (isAuthenticated && token) {
      console.log("Authenticated - Redirect home");
      if (tenantId) {
        navigate(`/${tenantId}/home`); // Redirect to the tenant's home page
      } else {
        navigate("/"); // Or handle the case where tenantId is not available
      }
    }
  }, [isAuthenticated, navigate]);

  // Call tenant service to get the auth provider if for the tenant (created by GCP when tenant added,but stored in firestore).
  // The provider tenantId is required as part of auth process.  Note that the Google login button is disabled until this completes.
  const {
    data: tenantDetails,
    error: apiError,
    isLoading,
  } = useGetTenantByIdQuery(tenantId ?? "");
  useEffect(() => {
    console.log("Query result:", { tenantDetails, apiError, isLoading });
  }, [tenantDetails, apiError, isLoading]);

  // Render the Auth component differently, depending upon the state of the Authentication process
  const AuthWrapper: React.FC<AuthWrapperProps> = ({
    devMode,
    isAuthenticated,
  }) => {
    if (devMode) {
      return (
        <button
          onClick={handleDevModeSignIn}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Dev Mode Login
        </button>
      );
    } else if (isAuthenticated) {
      return (
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      );
    } else {
      return (
        <button
          onClick={handleGoogleSignIn}
          disabled={!tenantDetails}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center space-x-2"
        >
          Sign in with Google
        </button>
      );
    }
  };

  const handleDevModeSignIn = async () => {
    try {
      console.log("Using dev mode (determined by env variable: DEV)");

      // Create a mock User object for dev mode
      const devUser: User = {
        uid: devUid,
        email: "dev@example.com",
        displayName: "Dev User",
        photoURL: null,
        emailVerified: true,
        isAnonymous: false,
        providerData: [],
        metadata: {},
        tenantId: null,
        refreshToken: "",
        phoneNumber: "039498484",
        delete: async () => {},
        getIdToken: async () => "dev-id-token",
        getIdTokenResult: async () => ({
          authTime: "",
          claims: {},
          expirationTime: "",
          issuedAtTime: "",
          signInProvider: null,
          signInSecondFactor: null,
          token: "dev-id-token",
        }),
        reload: async () => {},
        toJSON: () => ({}),
        providerId: "",
      };

      dispatch(setCredentials({ token: "dev-id-token", user: devUser }));
    } catch (err: any) {
      console.error("Dev sign-in error:", err);
      dispatch(setAuthError(err.message || "Failed to sign in Dev Mode."));
    }
  };

  const handleGoogleSignIn = async () => {
    dispatch(setAuthLoading());
    try {
      // At this point, tenantDetails should be available because button was enabled
      if (!tenantDetails) {
        throw new Error(`Tenant details not available for ID: ${tenantId}.`);
      }

      console.log(`Successfully using tenant details:`, tenantDetails);
      auth.tenantId = tenantDetails.identityManagerTenantIdTenantId;
      console.log(`Attempting to sign in with tenant: ${auth.tenantId}`);

      const googleProvider = new GoogleAuthProvider();

      const result = await signInWithPopup(authenticator, googleProvider);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

      dispatch(setCredentials({ token: idToken, user: firebaseUser }));
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
      navigate("/login"); // Redirect to login page
    } catch (err: any) {
      console.error("Logout error:", err);
      dispatch(setAuthError(err.message || "Failed to log out."));
    }
  };

  if (status === "loading") {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          {isAuthenticated
            ? `Welcome, ${user?.displayName || user?.email || "User"}!`
            : ""}
        </h2>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <AuthWrapper devMode={devMode} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};

export default AuthPage;
