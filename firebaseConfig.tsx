// src/firebaseConfig.ts (or src/firebase.ts)

// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics"; // Also import the Analytics type

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the type for Firebase configuration options
import { FirebaseOptions } from "firebase/app"; // Import the FirebaseOptions type

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  // Explicitly type the config object
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

// Initialize Analytics and get a reference to the service
// Specify the return type explicitly (though often inferred)
const analytics: Analytics = getAnalytics(app);

// Optional: Export the initialized app and analytics instances
export { app, analytics };

// If you plan to use other Firebase services like Auth, Firestore, etc.,
// remember to import their get functions and potentially their types,
// and initialize/export them here as well:
// import { getAuth, Auth } from 'firebase/auth';
// export const auth: Auth = getAuth(app);
