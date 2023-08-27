// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9J5T5g85Rde--rhNsT4hxZk6-Qqu98ng",
  authDomain: "chat-app-v1-49329.firebaseapp.com",
  projectId: "chat-app-v1-49329",
  storageBucket: "chat-app-v1-49329.appspot.com",
  messagingSenderId: "236894376508",
  appId: "1:236894376508:web:fcaecbd5c8d68ba1fc2939",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
