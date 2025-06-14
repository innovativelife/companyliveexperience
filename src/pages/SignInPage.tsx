import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential,
  AuthError,
} from "firebase/auth";

import { app } from "../../firebaseConfig"; // Assuming you have initialized your Firebase app elsewhere
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import React, { useState } from "react"; // Import useState for potentially showing errors

// Get the Auth instance
const auth = getAuth(app);

// Your component where you use GoogleLogin
function SignInPage() {
  const [firebaseSignInError, setFirebaseSignInError] =
    useState<AuthError | null>(null); // This function will be called when Google successfully authenticates the user

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    console.log("Google Credential Response received:", credentialResponse); // Clear any previous Firebase sign-in errors

    setFirebaseSignInError(null); // -------------------------------------------------------------------------- // This is the bridge! // We take the Google ID token from the response and use it to sign into Firebase. // -------------------------------------------------------------------------- // Ensure we have the Google ID token string

    const googleIdToken = credentialResponse.credential;
    if (!googleIdToken) {
      console.error("Google Credential Response missing ID token."); // Handle this case - maybe show a user-friendly error // setFirebaseSignInError({ code: 'auth/missing-google-id-token', message: 'Google sign-in response was incomplete.' } as AuthError); // Example custom error
      return;
    }

    try {
      // Create a Firebase credential using the Google ID token.
      // The newer Google Identity Services flow often only provides the ID token,
      // not the traditional access token for Google APIs. Firebase's credential
      // method handles this; you can pass null for the accessToken if you don't have it.
      // We expect the result to be a UserCredential from Firebase
      const firebaseCredential = GoogleAuthProvider.credential(
        googleIdToken,
        null
      ); // Sign in to Firebase Authentication with the credential derived from Google

      const firebaseSignInResult: UserCredential = await signInWithCredential(
        auth,
        firebaseCredential
      ); // ------------------------------------------------------------------------ // THIS IS THE 'onSuccess' for Firebase Authentication! // The user is now signed into Firebase. // ------------------------------------------------------------------------

      const user = firebaseSignInResult.user;
      console.log("Successfully signed into Firebase with Google!");
      console.log("Firebase User UID:", user.uid);
      console.log("Firebase User Display Name:", user.displayName); // At this point, `user` is your Firebase User object. // You can now redirect the user to your app's main page, update your UI state, etc. // As mentioned before, your onAuthStateChanged listener will also likely fire now, // which is a great place to manage UI state based on the user object. // If you need the Firebase ID token for *your* backend calls later:

      const firebaseIdToken = await user.getIdToken();
      console.log("Firebase ID Token for your backend:", firebaseIdToken); // Use firebaseIdToken when making fetch requests to your backend!
    } catch (error) {
      // <-- Type 'AuthError' here

      // ----------------------------------------------------------------------
      // THIS IS THE 'onError' for the Firebase Sign-in using the Google credential
      // Handle errors during the Firebase authentication step.
      // ----------------------------------------------------------------------
      console.error("Firebase sign-in with Google credential failed:", error);

      // Because we've typed the error parameter as 'AuthError',
      // TypeScript now knows 'error' is expected to have 'code' and 'message'.
      // We no longer need the explicit `error.code && error.message` check
      // for type narrowing, but it can still be useful defensively
      // if other non-AuthError types might theoretically be caught.

      // However, since signInWithCredential is documented to throw AuthErrors,
      // you can safely assume it's an AuthError here.
      const firebaseAuthError = error as AuthError; // Explicitly cast if needed, but often inferred if type is `AuthError`

      setFirebaseSignInError(firebaseAuthError); // Now error is definitely of type AuthError (or presumed to be)
      console.error(
        "Firebase Auth Error:",
        firebaseAuthError.code,
        firebaseAuthError.message
      );

      // Handle specific errors, e.g., linking accounts, invalid credentials
      // Check for specific codes like 'auth/account-exists-with-different-credential'
      if (
        firebaseAuthError.code ===
        "auth/account-exists-with-different-credential"
      ) {
        const errorWithEmail = firebaseAuthError as AuthError & {
          email: string;
        };
        const conflictingEmail = errorWithEmail.email;
        console.warn(
          `Account exists with a different credential for email: ${conflictingEmail}`
        );
        // Implement your account linking flow here (fetchSignInMethodsForEmail, sign in with existing, linkWithCredential)
        // Refer to the facts/documentation for the resolution steps for auth/account-exists-with-different-credential
      }
      // ... handle other specific codes like 'auth/invalid-credential', 'auth/user-disabled', etc.
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Google Login Failed (user likely cancelled)"); // You might want to show a simple message here // setFirebaseSignInError({ code: 'auth/google-login-cancelled', message: 'Google sign-in was cancelled.' } as AuthError);
  }; // Replace "YOUR_GOOGLE_CLOUD_WEB_CLIENT_ID" with the actual Client ID // from your Google Cloud project -> APIs & Services -> Credentials -> OAuth 2.0 Client IDs (Type: Web application)

  const YOUR_GOOGLE_CLOUD_WEB_CLIENT_ID =
    "1051288677497-1rqgtld0gnjgvuc8m9vi3j4m3hemn56f.apps.googleusercontent.com"; // <<-- IMPORTANT! // Make sure you have added your redirect URIs in the Google Cloud Console // for this Client ID (e.g., https://<your-firebase-app>.firebaseapp.com/__/auth/handler)

  return (
    <div>
      <h1>Sign In to My App</h1>{" "}
      {/* The GoogleOAuthProvider wraps the parts of your app that use Google Login */}
      {/* Make sure clientId is correct */}{" "}
      <GoogleOAuthProvider clientId={YOUR_GOOGLE_CLOUD_WEB_CLIENT_ID}>
        {/* The GoogleLogin component renders the sign-in button */}{" "}
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess} // Our success handler
          onError={handleGoogleLoginError} // Our optional error handler // Add other props like useOneTap, auto_select, etc. as needed
        />{" "}
      </GoogleOAuthProvider>
      {/* Display Firebase sign-in errors */}{" "}
      {firebaseSignInError && (
        <p style={{ color: "red" }}>
          Sign-in error: {firebaseSignInError.message} (Code:{" "}
          {firebaseSignInError.code}){" "}
        </p>
      )}{" "}
      {/* You would also likely have an onAuthStateChanged listener elsewhere
in your app to manage UI state based on the actual Firebase user */}{" "}
    </div>
  );
}

export default SignInPage;
