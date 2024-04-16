    // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3xxSCEKiaPQ6CVt_u_jpmpj58JoCiSzU",
  authDomain: "foci-ng.firebaseapp.com",
  projectId: "foci-ng",
  storageBucket: "foci-ng.appspot.com",
  messagingSenderId: "680752297837",
  appId: "1:680752297837:web:5eaa8da0bcbdd5c4efcc64",
  measurementId: "G-HFEXWV9PG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);