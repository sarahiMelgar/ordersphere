// pages/Pedidos.jsx
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { obtenerPedidos, actualizarPedido } from "../firebase/pedidos";
import { 
  FaBox, 
  FaSearch, 
  FaTimes, 
  FaEye, 
  FaCheck, 
  FaClock, 
  FaSpinner,
  FaBan,
  FaTruck
} from "react-icons/fa";
import Swal from "sweetalert2";

function Pedidos() {
  // ==========================
  // ESTADOS
  // ==========================
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null); // para modal de ver

  // ==========================
  // CARGAR PEDIDOS
  // ==========================
  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      const data = await obtenerPedidos();
      setPedidos(data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los pedidos",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // FILTRADO
  // ==========================
  const pedidosFiltrados = pedidos.filter(pedido => {
    const texto = busqueda.toLowerCase().trim();
    const idStr = pedido.id?.toLowerCase() || "";
    const cliente = pedido.cliente?.toLowerCase() || "";
    const total = pedido.total?.toString() || "";
    return idStr.includes(texto) || cliente.includes(texto) || total.includes(texto);
  });

  // ==========================
  // ACTUALIZAR ESTADO
  // ==========================
  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarPedido(id, { estado: nuevoEstado });
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `El pedido ahora está ${nuevoEstado}`,
        confirmButtonColor: "#f97316",
        timer: 2000,
        showConfirmButton: false
      });
      cargarPedidos(); // recargar lista
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el estado",
        confirmButtonColor: "#ef4444"
      });
    }
  };

  // ==========================
  // ABRIR MODAL DE VER
  // ==========================
  const verDetalle = (pedido) => {
    setPedidoSeleccionado(pedido);
  };

  // ==========================
  // OBTENER COLOR DEL ESTADO
  // ==========================
  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "en_camino":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "entregado":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "cancelado":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  // ==========================
  // LABEL LEGIBLE DEL ESTADO
  // ==========================
  const getEstadoLabel = (estado) => {
    switch (estado?.toLowerCase()) {
      case "pendiente":
        return "Pendiente";
      case "en_camino":
        return "En Camino";
      case "entregado":
        return "Entregado";
      case "cancelado":
        return "Cancelado";
      default:
        return estado || "Pendiente";
    }
  };

  // ==========================
  // RENDER
  // ==========================
  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 md:p-8">
        
        {/* HERO */}
        <div className="relative overflow-hidden bg-linear-to-r from-orange-500 to-amber-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <FaBox className="text-5xl" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight">Gestión de Pedidos</h2>
              <p className="mt-2 text-orange-100 text-lg">
                Administra y monitorea todos los pedidos en tiempo real.
              </p>
            </div>
          </div>
        </div>

        {/* ESTADÍSTICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Pedidos</p>
                <p className="text-3xl font-bold text-orange-500 mt-1">{pedidos.length}</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
                <FaBox className="text-orange-500 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-500 mt-1">
                  {pedidos.filter(p => p.estado?.toLowerCase() === "pendiente").length}
                </p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
                <FaClock className="text-yellow-500 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">En Camino</p>
                <p className="text-3xl font-bold text-blue-500 mt-1">
                  {pedidos.filter(p => p.estado?.toLowerCase() === "en_camino").length}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                <FaSpinner className="text-blue-500 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Entregados</p>
                <p className="text-3xl font-bold text-green-500 mt-1">
                  {pedidos.filter(p => p.estado?.toLowerCase() === "entregado").length}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                <FaCheck className="text-green-500 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* TABLA */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <FaBox className="text-orange-500" />
                Lista de Pedidos
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
                  ({pedidosFiltrados.length} {pedidosFiltrados.length === 1 ? 'pedido' : 'pedidos'})
                </span>
              </h3>
              <div className="relative w-full sm:w-64">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar pedido..."
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Pedido</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Cliente</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Fecha</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Total</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Estado</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
                      </div>
                      <p className="mt-2">Cargando pedidos...</p>
                    </td>
                  </tr>
                ) : pedidosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      {busqueda ? (
                        <>
                          <p>No se encontraron pedidos para "<strong>{busqueda}</strong>"</p>
                          <button onClick={() => setBusqueda("")} className="mt-2 text-orange-500 hover:underline">
                            Limpiar búsqueda
                          </button>
                        </>
                      ) : (
                        <p>No hay pedidos registrados aún.</p>
                      )}
                    </td>
                  </tr>
                ) : (
                  pedidosFiltrados.map((pedido) => (
                    <tr key={pedido.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                      <td className="py-4 px-6 font-medium dark:text-white">#{pedido.id?.slice(0, 6) || 'N/A'}</td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{pedido.cliente || 'Cliente'}</td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                        {pedido.fecha?.toDate?.().toLocaleDateString() || pedido.fecha || 'N/A'}
                      </td>
                      <td className="py-4 px-6 font-semibold text-green-600 dark:text-green-400">
                        ${pedido.total?.toFixed(2) || '0.00'}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(pedido.estado)}`}>
                          <span className={`w-2 h-2 rounded-full ${pedido.estado?.toLowerCase() === 'entregado' ? 'bg-green-500' : pedido.estado?.toLowerCase() === 'pendiente' ? 'bg-yellow-500' : pedido.estado?.toLowerCase() === 'en_camino' ? 'bg-blue-500' : 'bg-slate-500'}`}></span>
                          {getEstadoLabel(pedido.estado)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <button
                            onClick={() => verDetalle(pedido)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                            title="Ver detalles"
                          >
                            <FaEye size={16} />
                          </button>

                          {/* Botones para cambiar estado (solo si no está entregado o cancelado) */}
                          {pedido.estado?.toLowerCase() !== 'entregado' && pedido.estado?.toLowerCase() !== 'cancelado' && (
                            <>
                              <button
                                onClick={() => cambiarEstado(pedido.id, 'pendiente')}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-xl transition-all duration-200"
                                title="Marcar como Pendiente"
                              >
                                <FaClock size={16} />
                              </button>
                              <button
                                onClick={() => cambiarEstado(pedido.id, 'en_camino')}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition-all duration-200"
                                title="Marcar como En Camino"
                              >
                                <FaTruck size={16} />
                              </button>
                              <button
                                onClick={() => cambiarEstado(pedido.id, 'entregado')}
                                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl transition-all duration-200"
                                title="Marcar como Entregado"
                              >
                                <FaCheck size={16} />
                              </button>
                              <button
                                onClick={() => cambiarEstado(pedido.id, 'cancelado')}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-all duration-200"
                                title="Cancelar pedido"
                              >
                                <FaBan size={16} />
                              </button>
                            </>
                          )}
                          {pedido.estado?.toLowerCase() === 'entregado' && (
                            <span className="text-sm text-green-500 font-semibold">Entregado</span>
                          )}
                          {pedido.estado?.toLowerCase() === 'cancelado' && (
                            <span className="text-sm text-red-500 font-semibold">Cancelado</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==========================
          MODAL DE VER DETALLE
      ========================== */}
      {pedidoSeleccionado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full shadow-2xl transform transition-all animate-fadeIn">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <FaEye className="text-blue-500" />
                Detalle del Pedido
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
                  #{pedidoSeleccionado.id?.slice(0, 6) || 'N/A'}
                </span>
              </h3>
              <button
                onClick={() => setPedidoSeleccionado(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <FaTimes className="text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Cliente</p>
                  <p className="font-semibold dark:text-white">{pedidoSeleccionado.cliente || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
                  <p className="font-semibold text-green-600 dark:text-green-400">${pedidoSeleccionado.total?.toFixed(2) || '0.00'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Estado</p>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(pedidoSeleccionado.estado)}`}>
                    {getEstadoLabel(pedidoSeleccionado.estado)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Fecha</p>
                  <p className="font-semibold dark:text-white">
                    {pedidoSeleccionado.fecha?.toDate?.().toLocaleDateString() || pedidoSeleccionado.fecha || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Productos (si existen) */}
              {pedidoSeleccionado.productos && pedidoSeleccionado.productos.length > 0 && (
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Productos</p>
                  <ul className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 space-y-2">
                    {pedidoSeleccionado.productos.map((prod, idx) => (
                      <li key={idx} className="flex justify-between text-sm">
                        <span className="dark:text-white">{prod.nombre || 'Producto'}</span>
                        <span className="text-slate-600 dark:text-slate-300">x{prod.cantidad || 1} - ${(prod.precio || 0).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-700/30 rounded-b-3xl flex justify-end">
              <button
                onClick={() => setPedidoSeleccionado(null)}
                className="px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all shadow-lg hover:shadow-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animación modal */}
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

export default Pedidos;