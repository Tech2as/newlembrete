import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAbgrHPVuxkv6mPwIHgDfh4QQJYqlFaSMw",
    authDomain: "curso-2d59b.firebaseapp.com",
    projectId: "curso-2d59b",
    storageBucket: "curso-2d59b.appspot.com",
    messagingSenderId: "983337100127",
    appId: "1:983337100127:web:9a72c4605982fd60fbccea"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth (firebaseApp);
  export { db, auth };