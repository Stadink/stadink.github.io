import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZAojdFe9lP0jyGAluKHTdCiHM7TPT4RQ",
    authDomain: "dashboard-14d63.firebaseapp.com",
    projectId: "dashboard-14d63",
    storageBucket: "dashboard-14d63.appspot.com",
    messagingSenderId: "634019035569",
    appId: "1:634019035569:web:0fa1509cd4cf9498536590",
    measurementId: "G-SLYCHG806R"
  };    

  const app = initializeApp(firebaseConfig);
  export default getFirestore();