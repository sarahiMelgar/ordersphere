import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvVY4ZQQRXSxFd4H350LvbDvrayd_pUz4",
  authDomain: "ordersphere-dbda9.firebaseapp.com",
  projectId: "ordersphere-dbda9",
  storageBucket: "ordersphere-dbda9.firebasestorage.app",
  messagingSenderId: "977233803920",
  appId: "1:977233803920:web:722991cda49f176a083615"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;