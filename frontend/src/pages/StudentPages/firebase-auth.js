// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./config";

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export { auth };

export const firestore = getFirestore(app);


// Initialize Firebase


