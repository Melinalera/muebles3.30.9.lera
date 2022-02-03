// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfJNPfS6yuNvesycKos_YWSkRGRkv1yuA",
  authDomain: "muebles3309lera.firebaseapp.com",
  projectId: "muebles3309lera",
  storageBucket: "muebles3309lera.appspot.com",
  messagingSenderId: "150820142011",
  appId: "1:150820142011:web:120593a05625d1507e229e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirestoreApp=() =>{
    return app
}
