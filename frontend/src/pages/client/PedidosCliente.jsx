import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Home, UtensilsCrossed, Clock, ChevronRight, Search } from "lucide-react";
import BottomNav from "../../components/client/BottomNav";

function PedidosCliente() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-orange-50 to-red-50 relative overflow-hidden pb-28">

      {/* NAVBAR */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-slate-200 backdrop-blur-md bg-white/70 sticky top-0">
        <div className="flex items-center gap-2 text-xl font-black text-slate-900 tracking-tight">
          🍔 Order<span className="text-orange-500">Sphere</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Inicio", path: "/inicio", icon: <Home size={14} /> },
            { label: "Menú", path: "/menu", icon: <UtensilsCrossed size={14} /> },
            { label: "Mis Pedidos", path: "/pedidoscliente", icon: <Clock size={14} /> },
            { label: "Carrito", path: "/carrito", icon: <ShoppingCart size={14} /> },
            { label: "Perfil", path: "/perfil", icon: <User size={14} /> },
          ].map(({ label, path, icon }) => (
            <span
              key={label}
              onClick={() => navigate(path)}
              className="flex items-center gap-1.5 text-slate-500 text-sm font-medium cursor-pointer hover:text-orange-500 transition-colors duration-200"
            >
              {icon} {label}
            </span>
          ))}
        </div>
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700"
        >
          {menuAbierto ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* MENÚ MOBILE */}
      {menuAbierto && (
        <div className="md:hidden fixed inset-0 z-40 bg-linear-to-br from-slate-100 via-orange-50 to-red-50 backdrop-blur-xl flex flex-col pt-24 px-8">
          <div className="flex flex-col gap-2">
            {[
              { icon: <Home size={20} />, label: "Inicio", path: "/inicio" },
              { icon: <UtensilsCrossed size={20} />, label: "Menú", path: "/menu" },
              { icon: <Clock size={20} />, label: "Mis Pedidos", path: "/pedidoscliente" },
              { icon: <ShoppingCart size={20} />, label: "Carrito", path: "/carrito" },
              { icon: <User size={20} />, label: "Mi Perfil", path: "/perfil" },
            ].map(({ icon, label, path }) => (
              <button
                key={label}
                onClick={() => { navigate(path); setMenuAbierto(false); }}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-700 hover:bg-white/60 hover:text-orange-500 transition-all text-left text-lg font-semibold"
              >
                <span className="text-orange-500">{icon}</span>
                {label}
                <ChevronRight size={16} className="ml-auto text-slate-400" />
              </button>
            ))}
          </div>
          <div className="mt-auto mb-12 p-5 rounded-2xl bg-white/70 border border-orange-200">
            <p className="text-slate-900 font-black text-lg">👋 Hola, Cliente</p>
            <p className="text-slate-500 text-sm mt-1">admin@ordersphere.com</p>
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <div className="relative z-10 p-6 md:p-8 space-y-8">

        {/* Hero */}
        <div className="relative rounded-3xl p-8 border border-orange-200 bg-white/60 backdrop-blur-sm overflow-hidden">
          <p className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-2">
            ✦ Tu actividad
          </p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            🛒 Mis Pedidos
          </h2>
          <p className="mt-2 text-slate-500 text-lg">
            Consulta el estado de tus pedidos y el historial de compras.
          </p>
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-slate-500 text-sm font-medium">
              Pedidos Totales
            </h3>
            <p className="text-4xl font-black text-orange-500 mt-2 tracking-tight">
              24
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-slate-500 text-sm font-medium">
              En Proceso
            </h3>
            <p className="text-4xl font-black text-yellow-500 mt-2 tracking-tight">
              3
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-slate-500 text-sm font-medium">
              Entregados
            </h3>
            <p className="text-4xl font-black text-green-500 mt-2 tracking-tight">
              21
            </p>
          </div>

        </div>

        {/* Historial */}
        <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              📦 Historial de Pedidos
            </h3>

            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar pedido..."
                className="
                  border
                  border-slate-200
                  bg-white
                  rounded-xl
                  pl-9
                  pr-4
                  py-2
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange-400
                "
              />
            </div>
          </div>

          <div className="space-y-3">

            {/* Pedido 1 */}
            <div className="border border-slate-200 bg-white rounded-2xl p-5 hover:shadow-md hover:border-orange-300 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Pedido #1001
                  </h4>
                  <p className="text-slate-500 text-sm">
                    15 Junio 2026 - 6:30 PM
                  </p>
                  <p className="mt-2 text-slate-700 text-sm">
                    🍔 Hamburguesa Clásica x2
                  </p>
                  <p className="text-slate-700 text-sm">
                    🥤 Refresco x2
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold">
                    Entregado
                  </span>
                  <p className="text-xl font-black mt-3 text-orange-500 tracking-tight">
                    $320
                  </p>
                </div>
              </div>
            </div>

            {/* Pedido 2 */}
            <div className="border border-slate-200 bg-white rounded-2xl p-5 hover:shadow-md hover:border-orange-300 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Pedido #1002
                  </h4>
                  <p className="text-slate-500 text-sm">
                    18 Junio 2026 - 8:15 PM
                  </p>
                  <p className="mt-2 text-slate-700 text-sm">
                    🍟 Combo Doble x1
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-bold">
                    Preparando
                  </span>
                  <p className="text-xl font-black mt-3 text-orange-500 tracking-tight">
                    $210
                  </p>
                </div>
              </div>
            </div>

            {/* Pedido 3 */}
            <div className="border border-slate-200 bg-white rounded-2xl p-5 hover:shadow-md hover:border-orange-300 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Pedido #1003
                  </h4>
                  <p className="text-slate-500 text-sm">
                    19 Junio 2026 - 2:10 PM
                  </p>
                  <p className="mt-2 text-slate-700 text-sm">
                    🌮 Tacos Especiales x3
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold">
                    En Camino
                  </span>
                  <p className="text-xl font-black mt-3 text-orange-500 tracking-tight">
                    $280
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <BottomNav />
    </div>
  );
}

export default PedidosCliente;