import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBINyB4Am_vuYkIdHTr8P6pphNQgEbJNz8",
  authDomain: "travel-planner-ae1ca.firebaseapp.com",
  projectId: "travel-planner-ae1ca",
  storageBucket: "travel-planner-ae1ca.appspot.com",
  messagingSenderId: "730159376710",
  appId: "1:730159376710:web:0c1ff42a98e6643f819d47",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
