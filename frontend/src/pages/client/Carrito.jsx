import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Home, UtensilsCrossed, Clock, ChevronRight, Trash2 } from "lucide-react";
import BottomNav from "../../components/client/BottomNav";
import ModalPago from "../../components/client/ModalPago";

function Carrito() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [productos, setProductos] = useState([]);
  const [modalPagoAbierto, setModalPagoAbierto] = useState(false);

  useEffect(() => {

    const carritoGuardado =
      JSON.parse(
        localStorage.getItem("carrito")
      ) || [];

    setProductos(carritoGuardado);

  }, []);

  const eliminarProducto = (id) => {

    const nuevoCarrito =
      productos.filter(
        (producto) => producto.id !== id
      );

    setProductos(nuevoCarrito);

    localStorage.setItem(
      "carrito",
      JSON.stringify(nuevoCarrito)
    );
    window.dispatchEvent(new Event("carritoActualizado"));

  };

  const subtotal = productos.reduce(
    (total, producto) =>
      total + (producto.precio * producto.cantidad),
    0
  );

  const envio = productos.length > 0 ? 30 : 0;

  const total = subtotal + envio;

  const handlePagoConfirmado = (metodo) => {
    localStorage.removeItem("carrito");
    window.dispatchEvent(new Event("carritoActualizado"));
    setModalPagoAbierto(false);
    navigate("/pedidoscliente");
  };

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

        {/* Encabezado */}
        <div className="relative rounded-3xl p-8 border border-orange-200 bg-white/60 backdrop-blur-sm overflow-hidden">
          <p className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-2">
            ✦ Antes de pedir
          </p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            🛒 Mi Carrito
          </h2>
          <p className="mt-2 text-slate-500 text-lg">
            Revisa tus productos antes de realizar el pedido.
          </p>
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Productos */}
          <div className="xl:col-span-2 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm">

            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">
              📦 Productos
            </h3>

            {productos.length === 0 && (

              <div className="text-center py-10">
                <p className="text-slate-400 text-lg">
                  Tu carrito está vacío 🛒
                </p>
              </div>

            )}

            <div className="space-y-3">

              {productos.map((producto) => (

                <div
                  key={producto.id}
                  className="
                    border
                    border-slate-200
                    bg-white
                    rounded-2xl
                    p-5
                    hover:shadow-md
                    hover:border-orange-300
                    transition-all
                    duration-300
                    flex
                    justify-between
                    items-center
                  "
                >

                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      {producto.nombre}
                    </h4>
                    <p className="text-slate-500 text-sm">
                      Cantidad: {producto.cantidad}
                    </p>
                    <p className="text-orange-500 font-black mt-1">
                      ${producto.precio}
                    </p>
                  </div>

                  <div className="text-right">
                    <button
                      onClick={() =>
                        eliminarProducto(producto.id)
                      }
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-red-500
                        text-sm
                        font-semibold
                        hover:text-red-600
                        transition-colors
                      "
                    >
                      <Trash2 size={14} />
                      Eliminar
                    </button>
                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Resumen */}
          <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">

            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">
              🧾 Resumen
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between text-slate-600 text-sm">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between text-slate-600 text-sm">
                <span>Envío</span>
                <span>${envio}</span>
              </div>

              <hr className="border-slate-200" />

              <div className="flex justify-between text-xl font-black text-slate-900 tracking-tight">
                <span>Total</span>
                <span className="text-orange-500">
                  ${total}
                </span>
              </div>

              <button
                onClick={() => setModalPagoAbierto(true)}
                disabled={productos.length === 0}
                className="
                  w-full
                  bg-orange-500
                  hover:bg-orange-400
                  text-white
                  py-3.5
                  rounded-2xl
                  font-bold
                  hover:scale-[1.02]
                  transition-all
                  duration-200
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  disabled:hover:scale-100
                "
              >
                Confirmar Pedido
              </button>

            </div>

          </div>

        </div>

      </div>

      {modalPagoAbierto && (
        <ModalPago
          total={total}
          onClose={() => setModalPagoAbierto(false)}
          onConfirmar={handlePagoConfirmado}
        />
      )}

      <BottomNav />

    </div>

  );

}

export default Carrito;