import Layout from "../components/Layout";

function Categorias() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">

        {/* Encabezado */}
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
            🗂️ Gestión de Categorías
          </h2>

          <p className="mt-3 text-orange-100 text-lg">
            Organiza tus productos por categorías para mejorar la experiencia de tus clientes.
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
              duration-300
            "
          >
            + Nueva Categoría
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-slate-500 font-medium">
              Total Categorías
            </h3>

            <p className="text-4xl font-bold text-orange-600 mt-2">
              12
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-slate-500 font-medium">
              Más Popular
            </h3>

            <p className="text-2xl font-bold text-slate-800 mt-2">
              Hamburguesas
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-slate-500 font-medium">
              Productos Asociados
            </h3>

            <p className="text-4xl font-bold text-orange-600 mt-2">
              128
            </p>
          </div>

        </div>

        {/* Tabla */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

          <div className="flex justify-between items-center mb-6">

            <h3 className="text-2xl font-bold text-slate-800">
              📋 Lista de Categorías
            </h3>

            <input
              type="text"
              placeholder="Buscar categoría..."
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

                  <th className="text-left py-4 text-slate-500">
                    Nombre
                  </th>

                  <th className="text-left py-4 text-slate-500">
                    Productos
                  </th>

                  <th className="text-left py-4 text-slate-500">
                    Estado
                  </th>

                  <th className="text-center py-4 text-slate-500">
                    Acciones
                  </th>

                </tr>
              </thead>

              <tbody>

                <tr className="border-b hover:bg-slate-50">

                  <td className="py-4 font-semibold">
                    🍔 Hamburguesas
                  </td>

                  <td className="py-4">
                    35
                  </td>

                  <td className="py-4">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      Activa
                    </span>
                  </td>

                  <td className="py-4 text-center space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Editar
                    </button>

                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                      Eliminar
                    </button>
                  </td>

                </tr>

                <tr className="border-b hover:bg-slate-50">

                  <td className="py-4 font-semibold">
                    🍕 Pizzas
                  </td>

                  <td className="py-4">
                    20
                  </td>

                  <td className="py-4">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      Activa
                    </span>
                  </td>

                  <td className="py-4 text-center space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Editar
                    </button>

                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                      Eliminar
                    </button>
                  </td>

                </tr>

                <tr className="hover:bg-slate-50">

                  <td className="py-4 font-semibold">
                    🥤 Bebidas
                  </td>

                  <td className="py-4">
                    18
                  </td>

                  <td className="py-4">
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                      Oculta
                    </span>
                  </td>

                  <td className="py-4 text-center space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Editar
                    </button>

                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
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

export default Categorias;