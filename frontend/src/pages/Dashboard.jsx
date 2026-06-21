import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <Layout>

<div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
        {/* Hero */}
        <div
          className="bg-linear-to-r
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
            🍔 Bienvenido Administrador
          </h2>

          <p className="mt-3 text-orange-100 text-lg">
            Gestiona productos, pedidos y promociones desde un solo lugar.
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
            Ver Pedidos
          </button>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <StatCard
            icon="📦"
            title="Productos"
            value="128"
            subtitle="+12% este mes"
          />

          <StatCard
            icon="🛒"
            title="Pedidos"
            value="34"
            subtitle="8 pendientes"
          />

          <StatCard
            icon="👥"
            title="Clientes"
            value="89"
            subtitle="+5 nuevos hoy"
          />

          <StatCard
            icon="💰"
            title="Ventas"
            value="$12,540"
            subtitle="+18% este mes"
          />

        </div>

        {/* Sección inferior */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Gráfica */}
          <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

<h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">              📈 Ventas Semanales
            </h3>

            <div className="h-80 flex items-center justify-center text-slate-400">
              Aquí irá la gráfica con Recharts
            </div>

          </div>

          {/* Actividad */}
<div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              🔥 Actividad Reciente
            </h3>

            <div className="space-y-5">

              <div className="border-b pb-4">
                <p className="font-semibold">
                  Pedido #1023 entregado
                </p>
                <p className="text-slate-500 text-sm">
                  Hace 2 minutos
                </p>
              </div>

              <div className="border-b pb-4">
                <p className="font-semibold">
                  Nuevo producto agregado
                </p>
                <p className="text-slate-500 text-sm">
                  Hace 15 minutos
                </p>
              </div>

              <div className="border-b pb-4">
                <p className="font-semibold">
                  Promoción creada
                </p>
                <p className="text-slate-500 text-sm">
                  Hace 1 hora
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Nuevo cliente registrado
                </p>
                <p className="text-slate-500 text-sm">
                  Hace 3 horas
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;