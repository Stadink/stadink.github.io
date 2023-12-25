import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeAfyzIR9k4iyTQCa-_1S03WQBGhmOWdM",
  authDomain: "server-e4273.firebaseapp.com",
  projectId: "server-e4273",
  storageBucket: "server-e4273.appspot.com",
  messagingSenderId: "759834655955",
  appId: "1:759834655955:web:0e63207e68cf55b65ce826"
};    

  const app = initializeApp(firebaseConfig, 'UniqueAppName');
  console.log(app.name)
  export const db2 = getFirestore(app);

  