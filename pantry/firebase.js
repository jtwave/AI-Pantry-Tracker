// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8ylALfOvWf1b-rKm2ixUbrYQ6LEmGl5E",
  authDomain: "ai-pantry-8ede4.firebaseapp.com",
  projectId: "ai-pantry-8ede4",
  storageBucket: "ai-pantry-8ede4.appspot.com",
  messagingSenderId: "983631318900",
  appId: "1:983631318900:web:fcd1a6734e19160f07e621",
  measurementId: "G-X3DBZ2EY8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)
export {app, firestore}