// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNhX0cgWi2OUnBuxymvUhCTRhTIkrYLDM",
  authDomain: "my-3d-virtual-city.firebaseapp.com",
  projectId: "my-3d-virtual-city",
  storageBucket: "my-3d-virtual-city.firebasestorage.app",
  messagingSenderId: "106872410505",
  appId: "1:106872410505:web:f7071d3078e318ff4c1158",
  measurementId: "G-L622SECWGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);