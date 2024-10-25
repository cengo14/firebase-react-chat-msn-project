// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz-UfD8yuA1kWn72ChWvv9J20kSNflZtM",
  authDomain: "chatai-base.firebaseapp.com",
  projectId: "chatai-base",
  storageBucket: "chatai-base.appspot.com",
  messagingSenderId: "207407752674",
  appId: "1:207407752674:web:c393240ad867ff4e22c5bb",
  measurementId: "G-LFQB3TZSG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
