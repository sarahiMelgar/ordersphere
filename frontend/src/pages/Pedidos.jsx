import Layout from "../components/Layout";

function Pedidos() {
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
            🛒 Gestión de Pedidos
          </h2>

          <p className="mt-3 text-orange-100 text-lg">
            Administra y monitorea todos los pedidos en tiempo real.
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
            Ver Reportes
          </button>

        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <p className="text-slate-500">
              Total Pedidos
            </p>

            <h3 className="text-4xl font-bold text-orange-600 mt-2">
              245
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <p className="text-slate-500">
              Pendientes
            </p>

            <h3 className="text-4xl font-bold text-yellow-500 mt-2">
              18
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <p className="text-slate-500">
              Entregados
            </p>

            <h3 className="text-4xl font-bold text-green-500 mt-2">
              210
            </h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <p className="text-slate-500">
              Cancelados
            </p>

            <h3 className="text-4xl font-bold text-red-500 mt-2">
              17
            </h3>
          </div>

        </div>

        {/* Tabla */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

            <h3 className="text-2xl font-bold text-slate-800">
              📋 Lista de Pedidos
            </h3>

            <input
              type="text"
              placeholder="Buscar pedido..."
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
                    Pedido
                  </th>

                  <th className="text-left py-4">
                    Cliente
                  </th>

                  <th className="text-left py-4">
                    Fecha
                  </th>

                  <th className="text-left py-4">
                    Total
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

                  <td className="py-4 font-semibold">
                    #1001
                  </td>

                  <td>
                    Juan Pérez
                  </td>

                  <td>
                    20/06/2026
                  </td>

                  <td className="font-semibold text-green-600">
                    $350
                  </td>

                  <td>

                    <span
                      className="
                        bg-yellow-100
                        text-yellow-600
                        px-3
                        py-1
                        rounded-full
                        text-sm
                      "
                    >
                      Pendiente
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
                      Ver
                    </button>

                    <button
                      className="
                        bg-green-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "
                    >
                      Completar
                    </button>

                  </td>

                </tr>

                <tr className="border-b hover:bg-slate-50">

                  <td className="py-4 font-semibold">
                    #1002
                  </td>

                  <td>
                    María López
                  </td>

                  <td>
                    20/06/2026
                  </td>

                  <td className="font-semibold text-green-600">
                    $520
                  </td>

                  <td>

                    <span
                      className="
                        bg-green-100
                        text-green-600
                        px-3
                        py-1
                        rounded-full
                        text-sm
                      "
                    >
                      Entregado
                    </span>

                  </td>

                  <td className="text-center">

                    <button
                      className="
                        bg-blue-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "
                    >
                      Ver
                    </button>

                  </td>

                </tr>

                <tr className="hover:bg-slate-50">

                  <td className="py-4 font-semibold">
                    #1003
                  </td>

                  <td>
                    Carlos Ruiz
                  </td>

                  <td>
                    20/06/2026
                  </td>

                  <td className="font-semibold text-green-600">
                    $180
                  </td>

                  <td>

                    <span
                      className="
                        bg-red-100
                        text-red-600
                        px-3
                        py-1
                        rounded-full
                        text-sm
                      "
                    >
                      Cancelado
                    </span>

                  </td>

                  <td className="text-center">

                    <button
                      className="
                        bg-blue-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "
                    >
                      Ver
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

export default Pedidos;