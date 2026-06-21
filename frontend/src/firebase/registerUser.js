import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const registerUser = async (
  nombre,
  email,
  password
) => {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  await setDoc(
    doc(db, "Usuarios", user.uid),
    {
      uid: user.uid,
      nombre,
      correo: email,
      telefono: "",
      direccion: "",
      rol: "cliente",
      activo: true,
      fechaRegistro: new Date()
    }
  );

  return user;
};