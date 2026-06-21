const { db } = require("../firebase/firebase");

// Obtener categorías
const obtenerCategorias = async (req, res) => {
  try {
    const snapshot = await db.collection("categorias").get();

    const categorias = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(categorias);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Crear categoría
const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, activa } = req.body;

    const nuevaCategoria = await db.collection("categorias").add({
      nombre,
      descripcion,
      activa,
    });

    res.status(201).json({
      mensaje: "Categoría creada correctamente",
      id: nuevaCategoria.id,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Actualizar categoría
const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection("categorias").doc(id).update(req.body);

    res.json({
      mensaje: "Categoría actualizada correctamente",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Eliminar categoría
const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection("categorias").doc(id).delete();

    res.json({
      mensaje: "Categoría eliminada correctamente",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};