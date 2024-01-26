import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAhc2ngNg1G6J0I7EzvfkGQTmxMK9GBArQ",
  authDomain: "fir-study-68c3a.firebaseapp.com",
  databaseURL:
    "https://fir-study-68c3a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-study-68c3a",
  storageBucket: "fir-study-68c3a.appspot.com",
  messagingSenderId: "11063279211",
  appId: "1:11063279211:web:fa4b1cfe375ecb8839bb2e",
  measurementId: "G-8B6L2LF0RX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);