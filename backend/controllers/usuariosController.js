const { db } = require("../firebase/firebase");

const obtenerUsuarios = async (req, res) => {
  try {
    const collections = await db.listCollections();

    console.log(
      "Colecciones:",
      collections.map(c => c.id)
    );

    const snapshot = await db.collection("usuarios").get();

    console.log("Documentos encontrados:", snapshot.size);

    const usuarios = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(usuarios);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { obtenerUsuarios };