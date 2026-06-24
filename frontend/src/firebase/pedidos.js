// firebase/pedidos.js
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const COLECCION = "pedidos";

export const obtenerPedidos = async () => {
  const snapshot = await getDocs(collection(db, COLECCION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const crearPedido = async (data) => {
  const docRef = await addDoc(collection(db, COLECCION), data);
  return { id: docRef.id, ...data };
};

export const actualizarPedido = async (id, data) => {
  const ref = doc(db, COLECCION, id);
  await updateDoc(ref, data);
};

export const eliminarPedido = async (id) => {
  const ref = doc(db, COLECCION, id);
  await deleteDoc(ref);
};