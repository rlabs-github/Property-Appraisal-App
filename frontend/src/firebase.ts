// src/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyC0DbMKyVA7-78kimlPyM8BO5C0OB0cz_s",
  authDomain: "appraisal-platform-dev.firebaseapp.com",
  projectId: "appraisal-platform-dev",
  storageBucket: "appraisal-platform-dev.firebasestorage.app",
  messagingSenderId: "811306581001",
  appId: "1:811306581001:web:19f3b0302a4a1f7d14ccd8",
  measurementId: "G-LTLH6DNXZ2"
};

// Initialize Firebase if it hasn't been initialized already
export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (only in browser environment)
if (typeof window !== 'undefined') {
  getAnalytics(firebaseApp);
}
