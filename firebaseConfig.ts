// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, User } from 'firebase/auth';
import { getAnalytics, Analytics, logEvent } from "firebase/analytics"; // Also import the Analytics type

// Import the type for Firebase configuration options
import { FirebaseOptions } from "firebase/app"; // Import the FirebaseOptions type

// Web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCF00k7MPryL89I-FqQ4SlijW7i_8WriIw",
  authDomain: "companylive-c3879.firebaseapp.com",
  projectId: "companylive-c3879",
  storageBucket: "companylive-c3879.firebasestorage.app",
  messagingSenderId: "1051288677497",
  appId: "1:1051288677497:web:34d460d07857a8e436f8a8",
  measurementId: "G-ZPLZFY9MP7",
};

// Initialize Firebase
// Specify the return type explicitly (though often inferred)
const app: FirebaseApp = initializeApp(firebaseConfig);

// Get the Auth service instance
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
googleProvider.addScope('profile'); // Request access to profile information
googleProvider.addScope('email');   // Request access to email

// Initialize Analytics and get a reference to the service
// Specify the return type explicitly (though often inferred)
// export const analytics: Analytics = getAnalytics(app);
// Initialize Firebase Analytics (client-side only)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Firebase Analytics:", error);
    analytics = null;
  }
}

export { analytics, app, auth, googleProvider, logEvent }
export type {  User }
