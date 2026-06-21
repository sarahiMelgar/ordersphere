import Layout from "../components/Layout";

function Promociones() {
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
            🎉 Gestión de Promociones
          </h2>

          <p className="mt-3 text-orange-100 text-lg">
            Crea, administra y monitorea todas las promociones de tu negocio.
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
            + Nueva Promoción
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-slate-500 text-sm font-medium">
              Promociones Activas
            </h3>
            <p className="text-4xl font-bold text-orange-500 mt-2">
              12
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-slate-500 text-sm font-medium">
              Promociones Finalizadas
            </h3>
            <p className="text-4xl font-bold text-green-500 mt-2">
              28
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-slate-500 text-sm font-medium">
              Clientes Alcanzados
            </h3>
            <p className="text-4xl font-bold text-blue-500 mt-2">
              1,245
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-slate-500 text-sm font-medium">
              Ventas Generadas
            </h3>
            <p className="text-4xl font-bold text-emerald-500 mt-2">
              $8,540
            </p>
          </div>

        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Lista de promociones */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                📋 Promociones Activas
              </h3>

              <button className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition">
                Agregar
              </button>
            </div>

            <div className="space-y-4">

              <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">
                      Combo Familiar
                    </h4>
                    <p className="text-slate-500">
                      20% de descuento en pedidos mayores a $500
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Activa
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">
                      Martes de Hamburguesas
                    </h4>
                    <p className="text-slate-500">
                      2x1 en hamburguesas seleccionadas
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Activa
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">
                      Envío Gratis
                    </h4>
                    <p className="text-slate-500">
                      En compras superiores a $300
                    </p>
                  </div>

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    Próxima
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Panel lateral */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              🚀 Resumen
            </h3>

            <div className="space-y-5">

              <div className="border-b pb-4">
                <p className="font-semibold">
                  Promoción más exitosa
                </p>
                <p className="text-slate-500 text-sm">
                  Combo Familiar (+320 ventas)
                </p>
              </div>

              <div className="border-b pb-4">
                <p className="font-semibold">
                  Próxima campaña
                </p>
                <p className="text-slate-500 text-sm">
                  Verano 2026
                </p>
              </div>

              <div className="border-b pb-4">
                <p className="font-semibold">
                  Cupones utilizados
                </p>
                <p className="text-slate-500 text-sm">
                  785 canjeados
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Rendimiento promedio
                </p>
                <p className="text-slate-500 text-sm">
                  +18% en ventas
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Promociones;