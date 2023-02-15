import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPo5bFCbxOfK6GuBojUHHpCAISrvW3LRc",
  authDomain: "futcoinsmarket-d27b0.firebaseapp.com",
  projectId: "futcoinsmarket-d27b0",
  storageBucket: "futcoinsmarket-d27b0.appspot.com",
  messagingSenderId: "255150530624",
  appId: "1:255150530624:web:e10eaa4c92ffa9d0e87fa5",
  measurementId: "G-5ZKJX4Q7B9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
