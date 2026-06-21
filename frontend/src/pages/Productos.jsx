import { useState } from "react";
import Layout from "../components/Layout";

function Productos() {

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagen: ""
  });

  return (
    <Layout>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">

        {/* Hero */}
        <div
          className="
            bg-linear-to-r
            from-orange-500
            to-orange-600
            rounded-3xl
            p-8
            text-white
            mb-8
            shadow-lg
          "
        >
          <h2 className="text-4xl font-bold">
            🍔 Gestión de Productos
          </h2>

          <p className="mt-3 text-orange-100 text-lg">
            Administra los productos de tu negocio desde un solo lugar.
          </p>

          <button
            className="
              mt-6
              bg-white
              text-orange-600
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:scale-105
              transition-all
            "
          >
            + Nuevo Producto
          </button>

        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <p className="text-slate-500">
              Productos Totales
            </p>

            <h3 className="text-4xl font-bold text-orange-600 mt-2">
              128
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <p className="text-slate-500">
              Categorías
            </p>

            <h3 className="text-4xl font-bold text-orange-600 mt-2">
              12
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <p className="text-slate-500">
              Activos
            </p>

            <h3 className="text-4xl font-bold text-green-500 mt-2">
              115
            </h3>
          </div>

        </div>

        {/* Formulario */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-8">

          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            ➕ Nuevo Producto
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Nombre del producto"
              value={formulario.nombre}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  nombre: e.target.value
                })
              }
              className="border rounded-xl p-3"
            />

            <input
              type="number"
              placeholder="Precio"
              value={formulario.precio}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  precio: e.target.value
                })
              }
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              placeholder="Categoría"
              value={formulario.categoria}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  categoria: e.target.value
                })
              }
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              placeholder="URL de Imagen"
              value={formulario.imagen}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  imagen: e.target.value
                })
              }
              className="border rounded-xl p-3"
            />

          </div>

          <textarea
            placeholder="Descripción"
            value={formulario.descripcion}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                descripcion: e.target.value
              })
            }
            className="w-full border rounded-xl p-3 mt-4"
            rows="4"
          />

          <button
            className="
              mt-5
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            Guardar Producto
          </button>

        </div>

        {/* Tabla */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <div className="flex justify-between items-center mb-6">

            <h3 className="text-2xl font-bold text-slate-800">
              📦 Lista de Productos
            </h3>

            <input
              type="text"
              placeholder="Buscar producto..."
              className="
                border
                border-slate-300
                rounded-xl
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Imagen
                  </th>

                  <th className="text-left py-4">
                    Producto
                  </th>

                  <th className="text-left py-4">
                    Categoría
                  </th>

                  <th className="text-left py-4">
                    Precio
                  </th>

                  <th className="text-left py-4">
                    Estado
                  </th>

                  <th className="text-center py-4">
                    Acciones
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b hover:bg-slate-50">

                  <td className="py-4">
                    <img
                      src="https://via.placeholder.com/60"
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                  </td>

                  <td className="font-semibold">
                    Hamburguesa Clásica
                  </td>

                  <td>
                    Hamburguesas
                  </td>

                  <td>
                    $120
                  </td>

                  <td>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      Activo
                    </span>
                  </td>

                  <td className="text-center space-x-2">

                    <button
                      className="
                        bg-blue-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "
                    >
                      Editar
                    </button>

                    <button
                      className="
                        bg-red-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Productos;