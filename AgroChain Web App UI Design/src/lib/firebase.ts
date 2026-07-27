import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlD4WQEZy7DHVWZuNBqGZO80BlEbvM8Vs",
  authDomain: "agrochain-ecb09.firebaseapp.com",
  projectId: "agrochain-ecb09",
  storageBucket: "agrochain-ecb09.firebasestorage.app",
  messagingSenderId: "477614124404",
  appId: "1:477614124404:web:b88f4f3f3bd6362e85d021",
  measurementId: "G-RMY0SNWBDK",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, analytics, auth, db, storage };

