import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "./firebaseConfig";

export const loginUser = async (
  email,
  password
) => {

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user =
    userCredential.user;

  const docRef =
    doc(
      db,
      "Usuarios",
      user.uid
    );

  const docSnap =
    await getDoc(docRef);

  if (!docSnap.exists()) {

    throw new Error(
      "Usuario no encontrado en Firestore"
    );

  }

  return {
    user,
    data: docSnap.data()
  };

};

export const logoutUser = () =>
  signOut(auth);