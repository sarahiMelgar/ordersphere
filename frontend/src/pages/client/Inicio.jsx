import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Home,
  UtensilsCrossed,
  Clock,
  ArrowRight,
  ChevronRight
} from "lucide-react";

import BottomNav from "../../components/client/BottomNav";
import { obtenerProductos } from "../../firebase/productos";
import ProductoCard from "../../components/client/ProductoCard";

function Inicio() {
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data.slice(0, 3));
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-orange-50 to-red-50 relative overflow-hidden">

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

      {/* MENU MOBILE */}
      {menuAbierto && (
        <div className="md:hidden fixed inset-0 z-40 bg-linear-to-br from-slate-100 via-orange-50 to-red-50 backdrop-blur-xl flex flex-col pt-24 px-8">

          {[
            { icon: <Home size={20} />, label: "Inicio", path: "/inicio" },
            { icon: <UtensilsCrossed size={20} />, label: "Menú", path: "/menu" },
            { icon: <Clock size={20} />, label: "Mis Pedidos", path: "/pedidoscliente" },
            { icon: <ShoppingCart size={20} />, label: "Carrito", path: "/carrito" },
            { icon: <User size={20} />, label: "Mi Perfil", path: "/perfil" },
          ].map(({ icon, label, path }) => (
            <button
              key={label}
              onClick={() => {
                navigate(path);
                setMenuAbierto(false);
              }}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-700 hover:bg-white/60 hover:text-orange-500 transition-all text-left text-lg font-semibold"
            >
              <span className="text-orange-500">{icon}</span>
              {label}
              <ChevronRight size={16} className="ml-auto text-slate-400" />
            </button>
          ))}
        </div>
      )}

      {/* CONTENIDO */}
      <div className="relative z-10 p-6 pb-28">

        {/* BIENVENIDA */}
        <div className="relative rounded-3xl p-8 mb-8 border border-orange-200 bg-white/60 backdrop-blur-sm">

          <p className="text-orange-500 text-sm font-bold uppercase mb-2">
            ✦ Bienvenido de vuelta
          </p>

          <h2 className="text-4xl font-black text-slate-900">
            👋 Hola, Cliente
          </h2>

          <p className="mt-2 text-slate-500">
            ¿Qué se te antoja pedir hoy?
          </p>

          <button
            onClick={() => navigate("/menu")}
            className="mt-6 flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-7 py-3 rounded-2xl font-bold"
          >
            <UtensilsCrossed size={18} />
            Ver Menú
            <ArrowRight size={16} />
          </button>

        </div>

        {/* CATEGORÍAS */}
        <div className="mb-8">
          <h3 className="text-xl font-black text-slate-900 mb-4">
            🍽 Categorías
          </h3>

          <div className="grid grid-cols-4 gap-3">
            {[
              {
                img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80",
                label: "Hamburguesas"
              },
              {
                img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&q=80",
                label: "Combos"
              },
              {
                img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&q=80",
                label: "Bebidas"
              },
              {
                img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&q=80",
                label: "Postres"
              },
            ].map(({ img, label }) => (
              <div
                key={label}
                className="relative rounded-2xl overflow-hidden h-24 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <img src={img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <p className="absolute bottom-2 w-full text-center text-white font-bold text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTOS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-slate-900">
              🔥 Más vendidos
            </h3>

            <button
              onClick={() => navigate("/menu")}
              className="flex items-center gap-1 text-orange-500 text-sm font-semibold"
            >
              Ver todos <ChevronRight size={16} />
            </button>
          </div>

          {loading ? (
            <p className="text-slate-400">Cargando productos...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {productos.length > 0 ? (
                productos.map((producto) => (
                  <ProductoCard
                    key={producto.id}
                    id={producto.id}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    imagen={producto.imagen}
                  />
                ))
              ) : (
                <p className="text-slate-400 col-span-full text-center">
                  No hay productos registrados
                </p>
              )}

            </div>
          )}

        </div>

      </div>

      <BottomNav />

    </div>
  );
}

export default Inicio;