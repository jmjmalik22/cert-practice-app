// Firebase configuration for FabricPrep
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1JTnGQpmz7Vw3haIRywt9HmXS2HQGCKU",
  authDomain: "fabricprep-65092.firebaseapp.com",
  projectId: "fabricprep-65092",
  storageBucket: "fabricprep-65092.firebasestorage.app",
  messagingSenderId: "924193730642",
  appId: "1:924193730642:web:d5413e2ba72caf3514ef8b",
  measurementId: "G-XXDFWF7KEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
