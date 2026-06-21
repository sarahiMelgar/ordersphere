const express = require("express");
const cors = require("cors");
const categoriasRoutes = require("./routes/categoriasRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "🚀 API OrderSphere funcionando"
  });
});

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/categorias", categoriasRoutes);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});