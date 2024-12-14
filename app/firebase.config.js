// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZEp6Ut0nYwZlOQm9YYtPmv2HsDAd6YPY",
  authDomain: "donmacchiatos.firebaseapp.com",
  projectId: "donmacchiatos",
  storageBucket: "donmacchiatos.firebasestorage.app",
  messagingSenderId: "243480156978",
  appId: "1:243480156978:web:d72e91d790cdc15c66952b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithPopup, GoogleAuthProvider };
