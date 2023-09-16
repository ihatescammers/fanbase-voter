// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

import { collection, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvfmwSkKpiBEC-H0ZlkIv8m43Bg4zOGjk",
  authDomain: "fanbase-voter.firebaseapp.com",
  projectId: "fanbase-voter",
  storageBucket: "fanbase-voter.appspot.com",
  messagingSenderId: "442591407052",
  appId: "1:442591407052:web:2a061d2f911bb900de4b69",
  measurementId: "G-2NZX276N15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore();

try {
    const docRef = await addDoc(collection(db, "users"), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });
    console.log(`Document written with ID ${docRef.id}`)
} catch(e) {
    console.log(`Error finding document: ${e}`)
}