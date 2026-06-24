// pages/Clientes.jsx
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { 
  obtenerClientes, 
  actualizarCliente 
} from "../firebase/clientes";
import { 
  FaUsers, 
  FaUserCheck, 
  FaUserPlus, 
  FaEdit, 
  FaTimes,        // 👈 IMPORTADO
  FaSave,
  FaSearch,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUserTag,
  FaToggleOn,
  FaToggleOff
} from "react-icons/fa";
import Swal from "sweetalert2";

function Clientes() {
  // ==========================
  // ESTADOS
  // ==========================
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [formularioEdit, setFormularioEdit] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    rol: "cliente",
    activo: true
  });

  // ==========================
  // CARGAR CLIENTES
  // ==========================
  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const data = await obtenerClientes();
      const soloClientes = data.filter(usuario => usuario.rol === "cliente");
      setClientes(soloClientes);
    } catch (error) {
      console.error("Error cargando clientes:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los clientes",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // FILTRO BUSCADOR
  // ==========================
  const clientesFiltrados = clientes.filter((cliente) => {
    const nombre = cliente.nombre || "";
    const correo = cliente.Correo || cliente.correo || "";
    const telefono = cliente.telefono || "";
    const direccion = cliente.direccion || "";
    const texto = busqueda.toLowerCase().trim();
    return (
      nombre.toLowerCase().includes(texto) ||
      correo.toLowerCase().includes(texto) ||
      telefono.toLowerCase().includes(texto) ||
      direccion.toLowerCase().includes(texto)
    );
  });

  // ==========================
  // ABRIR MODAL DE EDICIÓN
  // ==========================
  const abrirModalEditar = (cliente) => {
    setClienteEditando(cliente);
    setFormularioEdit({
      nombre: cliente.nombre || "",
      correo: cliente.Correo || cliente.correo || "",
      telefono: cliente.telefono || "",
      direccion: cliente.direccion || "",
      rol: cliente.rol || "cliente",
      activo: cliente.activo !== undefined ? cliente.activo : true
    });
    setMostrarModal(true);
  };

  // ==========================
  // GUARDAR CAMBIOS (CORREGIDO)
  // ==========================
  const guardarEdicion = async () => {
    if (!clienteEditando) return;

    if (!formularioEdit.nombre.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Nombre requerido",
        text: "Debes ingresar un nombre",
        confirmButtonColor: "#f97316"
      });
      return;
    }
    if (!formularioEdit.correo.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Correo requerido",
        text: "Debes ingresar un correo electrónico",
        confirmButtonColor: "#f97316"
      });
      return;
    }

    try {
      await actualizarCliente(clienteEditando.id, {
        nombre: formularioEdit.nombre.trim(),
        Correo: formularioEdit.correo.trim(),
        telefono: formularioEdit.telefono.trim(),
        direccion: formularioEdit.direccion.trim(),
        rol: formularioEdit.rol,
        activo: formularioEdit.activo
      });
      
      Swal.fire({
        icon: "success",
        title: "¡Cliente actualizado!",
        text: "Los cambios se guardaron correctamente",
        confirmButtonColor: "#f97316"
      });
      setMostrarModal(false);
      cargarClientes();
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el cliente",
        confirmButtonColor: "#ef4444"
      });
    }
  }; // 👈 CIERRE DE LA FUNCIÓN (esto faltaba)

  // ==========================
  // RENDER
  // ==========================
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 md:p-8">
        
        {/* HERO */}
        <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <FaUsers className="text-5xl" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight">Gestión de Clientes</h2>
              <p className="mt-2 text-orange-100 text-lg">
                Administra la información y el estado de tus clientes registrados.
              </p>
            </div>
          </div>
        </div>

        {/* ESTADÍSTICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Clientes</p>
                <p className="text-3xl font-bold text-orange-500 mt-1">{clientes.length}</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
                <FaUsers className="text-orange-500 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Clientes Activos</p>
                <p className="text-3xl font-bold text-green-500 mt-1">
                  {clientes.filter(c => c.activo !== false).length}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                <FaUserCheck className="text-green-500 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Clientes Inactivos</p>
                <p className="text-3xl font-bold text-red-500 mt-1">
                  {clientes.filter(c => c.activo === false).length}
                </p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
                <FaUserPlus className="text-red-500 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* TABLA DE CLIENTES */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <FaUserCircle className="text-orange-500" />
                  Lista de Clientes
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
                    ({clientesFiltrados.length} {clientesFiltrados.length === 1 ? 'cliente' : 'clientes'})
                  </span>
                </h3>
                <div className="relative w-full sm:w-64">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                  {busqueda && (
                    <button
                      onClick={() => setBusqueda("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <FaTimes size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Cliente</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Correo</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Estado</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-12 text-slate-500">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
                        </div>
                        <p className="mt-2">Cargando clientes...</p>
                      </td>
                    </tr>
                  ) : clientesFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-12 text-slate-500">
                        {busqueda ? (
                          <>
                            <p>No se encontraron clientes para "<strong>{busqueda}</strong>"</p>
                            <button 
                              onClick={() => setBusqueda("")}
                              className="mt-2 text-orange-500 hover:underline"
                            >
                              Limpiar búsqueda
                            </button>
                          </>
                        ) : (
                          <p>No hay clientes registrados aún.</p>
                        )}
                      </td>
                    </tr>
                  ) : (
                    clientesFiltrados.map((cliente) => (
                      <tr key={cliente.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                              {cliente.nombre?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <span className="font-medium dark:text-white">{cliente.nombre}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <FaEnvelope className="text-slate-400 text-sm" />
                            {cliente.Correo || cliente.correo}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {cliente.activo !== false ? (
                            <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              Activo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              Inactivo
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => abrirModalEditar(cliente)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center mx-auto"
                            title="Editar cliente"
                          >
                            <FaEdit size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* PANEL LATERAL */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <FaUserTag className="text-orange-500" />
              Clientes Recientes
            </h3>
            <div className="space-y-4">
              {clientes.slice(0, 5).map((cliente) => (
                <div key={cliente.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {cliente.nombre?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold dark:text-white truncate">{cliente.nombre}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {cliente.Correo || cliente.correo}
                    </p>
                  </div>
                  <button
                    onClick={() => abrirModalEditar(cliente)}
                    className="text-slate-400 hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <FaEdit size={14} />
                  </button>
                </div>
              ))}
              {clientes.length === 0 && (
                <p className="text-slate-500 text-center py-6">No hay clientes recientes</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==========================
          MODAL DE EDICIÓN CON ESTADO
      ========================== */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full shadow-2xl transform transition-all animate-fadeIn">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <FaEdit className="text-blue-500" />
                Editar Cliente
              </h3>
              <button
                onClick={() => setMostrarModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <FaTimes className="text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={formularioEdit.nombre}
                  onChange={(e) => setFormularioEdit({ ...formularioEdit, nombre: e.target.value })}
                  className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  placeholder="Nombre del cliente"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={formularioEdit.correo}
                  onChange={(e) => setFormularioEdit({ ...formularioEdit, correo: e.target.value })}
                  className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={formularioEdit.telefono}
                  onChange={(e) => setFormularioEdit({ ...formularioEdit, telefono: e.target.value })}
                  className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  placeholder="+34 600 000 000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  value={formularioEdit.direccion}
                  onChange={(e) => setFormularioEdit({ ...formularioEdit, direccion: e.target.value })}
                  className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  placeholder="Calle, ciudad, país"
                />
              </div>

              {/* SELECTOR DE ESTADO */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Estado del cliente
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setFormularioEdit({ ...formularioEdit, activo: true })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      formularioEdit.activo === true
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <FaToggleOn size={20} />
                    Activo
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormularioEdit({ ...formularioEdit, activo: false })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      formularioEdit.activo === false
                        ? 'bg-red-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <FaToggleOff size={20} />
                    Inactivo
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-700/30 rounded-b-3xl flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarEdicion}
                className="px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <FaSave /> Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </Layout>
  );
}

export default Clientes;