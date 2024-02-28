// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ab30f.firebaseapp.com",
  projectId: "mern-auth-ab30f",
  storageBucket: "mern-auth-ab30f.appspot.com",
  messagingSenderId: "647823701015",
  appId: "1:647823701015:web:03b87d43033c35b406d852"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);