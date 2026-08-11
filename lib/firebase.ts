import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9t0lqpr7r9cGqDHWprXt972HUTR6LlGo",
  authDomain: "abroad-simplified.firebaseapp.com",
  projectId: "abroad-simplified",
  storageBucket: "abroad-simplified.firebasestorage.app",
  messagingSenderId: "829246439395",
  appId: "1:829246439395:web:f63036bb6c25a66281ead6"
};

// Initialize Firebase app (ensures single initialization for hot reloading)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
