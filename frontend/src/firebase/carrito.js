import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "./config";

export const agregarAlCarrito = async ({
  idCliente,
  idItem,
  tipo,
  cantidad = 1
}) => {

  const carritosRef = collection(db, "carritos");

  const q = query(
    carritosRef,
    where("id_cliente", "==", idCliente),
    where("estado", "==", "proceso")
  );

  const snapshot = await getDocs(q);

  // Si no existe carrito se crea
  if (snapshot.empty) {

    await addDoc(carritosRef, {
      estado: "proceso",
      id_cliente: idCliente,
      items: [
        {
          id_item: idItem,
          tipo,
          cantidad
        }
      ]
    });

    return;
  }

  // Existe carrito
  const carritoDoc = snapshot.docs[0];
  const carrito = carritoDoc.data();

  const items = carrito.items || [];

  const index = items.findIndex(
    item =>
      item.id_item === idItem &&
      item.tipo === tipo
  );

  if (index !== -1) {
    items[index].cantidad += cantidad;
  } else {
    items.push({
      id_item: idItem,
      tipo,
      cantidad
    });
  }

  await updateDoc(
    carritoDoc.ref,
    { items }
  );
};