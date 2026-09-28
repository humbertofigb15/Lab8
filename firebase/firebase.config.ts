// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzbV-NZrL_70a9ccphgiPi59-_X_UXXSg",
  authDomain: "lab8-12350.firebaseapp.com",
  projectId: "lab8-12350",
  storageBucket: "lab8-12350.firebasestorage.app",
  messagingSenderId: "854482274281",
  appId: "1:854482274281:web:38882ec343c51eb2d16d78",
  measurementId: "G-CS3F153M6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };