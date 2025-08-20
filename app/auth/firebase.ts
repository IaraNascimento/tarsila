import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXBhbRkRghAh-8Sa0-ibPh4gwfqt3rHBc",
  authDomain: "tarsila-web.firebaseapp.com",
  projectId: "tarsila-web",
  storageBucket: "tarsila-web.firebasestorage.app",
  messagingSenderId: "52921555945",
  appId: "1:52921555945:web:0df49c79a3d8c11fd58978",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
