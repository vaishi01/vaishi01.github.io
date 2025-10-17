import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA07lIjJX_RU7QqLBk6BgtIK-hp5due5ZE",
  authDomain: "ajacs-91076.firebaseapp.com",
  projectId: "ajacs-91076",
  storageBucket: "ajacs-91076.firebasestorage.app",
  messagingSenderId: "403020642617",
  appId: "1:403020642617:web:dba1b2ac764972cb8fd0e8",
  measurementId: "G-BDE88JT2WN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 