import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCxZJsxuNpmTMksSK4w6i9XD_4-Br9X8Ow",
  authDomain: "todolist-4fa3a.firebaseapp.com",
  databaseURL: "https://todolist-4fa3a-default-rtdb.firebaseio.com",
  projectId: "todolist-4fa3a",
  storageBucket: "todolist-4fa3a.firebasestorage.app",
  messagingSenderId: "291603831388",
  appId: "1:291603831388:web:0909e0b08133bab999e499",
  measurementId: "G-TNH02XFB2K"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
