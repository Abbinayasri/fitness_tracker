


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgNLih7ORRCIpoNHTtHv3O1VCyb9UZbKY",
  authDomain: "my-data-storage-44807.firebaseapp.com",
  projectId: "my-data-storage-44807",
  storageBucket: "my-data-storage-44807.firebasestorage.app",
  messagingSenderId: "965453935861",
  appId: "1:965453935861:web:ea5159e9537ce45f8801bc",
  measurementId: "G-NCL3Z0V0C6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export default db ;


