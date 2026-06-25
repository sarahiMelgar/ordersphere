import { Bell, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeaderCliente() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  useEffect(() => {
    // Usuario
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }

    // Carrito (función reutilizable)
    const actualizarCarrito = () => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const total = carrito.reduce(
        (acc, producto) => acc + (producto.cantidad || 1),
        0
      );

      setCantidadCarrito(total);
    };

    actualizarCarrito();

    // Escuchar cambios del carrito
    window.addEventListener("carritoActualizado", actualizarCarrito);

    return () => {
      window.removeEventListener("carritoActualizado", actualizarCarrito);
    };
  }, []);

  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO + USER */}
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            🍔 <span className="text-orange-500 ml-1">OrderSphere</span>
          </h1>

          <p className="text-sm text-slate-500">
            Hola 👋 {usuario?.nombre || "Cliente"}
          </p>
        </div>

        {/* ICONOS */}
        <div className="flex items-center gap-4">

          {/* NOTIFICACIONES */}
          <button className="relative w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-orange-500 hover:border-orange-300 transition">
            <Bell size={20} />

            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* CARRITO */}
          <button
            onClick={() => navigate("/carrito")}
            className="relative w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-orange-500 hover:border-orange-300 transition"
          >
            <ShoppingCart size={20} />

            {cantidadCarrito > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cantidadCarrito}
              </span>
            )}
          </button>

          {/* USUARIO */}
          <button
            onClick={() => navigate("/perfil")}
            className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold hover:scale-105 transition"
          >
            {usuario?.nombre
              ? usuario.nombre.charAt(0).toUpperCase()
              : "U"}
          </button>

        </div>
      </div>
    </header>
  );
}

export default HeaderCliente;