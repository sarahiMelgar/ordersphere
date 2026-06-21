import Layout from "../components/Layout";

function Settings() {
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
            ⚙️ Configuración
          </h2>

          <p className="mt-3 text-orange-100 text-lg">
            Personaliza los ajustes de tu sistema.
          </p>
        </div>

        {/* Configuraciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">
              👤 Perfil
            </h3>

            <input
              type="text"
              placeholder="Nombre"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              type="email"
              placeholder="Correo"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">
              🔒 Seguridad
            </h3>

            <input
              type="password"
              placeholder="Nueva contraseña"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <button
              className="
                bg-orange-500
                text-white
                px-5
                py-3
                rounded-xl
                hover:bg-orange-600
              "
            >
              Guardar Cambios
            </button>
          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Settings;