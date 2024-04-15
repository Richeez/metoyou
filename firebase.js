//? Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuRbRYgVe0dyEUL0V5ffIDTOP9xEqsHpM",
  authDomain: "metoyoumedia-f3ac0.firebaseapp.com",
  projectId: "metoyoumedia-f3ac0",
  storageBucket: "metoyoumedia-f3ac0.appspot.com",
  messagingSenderId: "348789708811",
  appId: "1:348789708811:web:8ffb820ad9ed6ddaea8f0e"
};

//? Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)