import {
  Bell,
  ShoppingCart,
  User
} from "lucide-react";
import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

function HeaderCliente() {
<<<<<<< HEAD

  const navigate = useNavigate();

=======
>>>>>>> 775c66b (Actualiza diseño visual del cliente)
  const [usuario, setUsuario] =
    useState(null);
  const [cantidadCarrito,
    setCantidadCarrito] =
    useState(0);

  useEffect(() => {
    const usuarioGuardado =
      JSON.parse(
        localStorage.getItem("usuario")
      );
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
<<<<<<< HEAD

    const actualizarCarrito = () => {

      const carrito =
        JSON.parse(
          localStorage.getItem("carrito")
        ) || [];

      const total =
        carrito.reduce(
          (acc, producto) =>
            acc + (producto.cantidad || 1),
          0
        );

      setCantidadCarrito(total);

    };

    actualizarCarrito();

    window.addEventListener(
      "carritoActualizado",
      actualizarCarrito
    );

    return () => {

      window.removeEventListener(
        "carritoActualizado",
        actualizarCarrito
      );

    };

=======
    const carrito =
      JSON.parse(
        localStorage.getItem("carrito")
      ) || [];
    const totalProductos =
      carrito.reduce(
        (acc, producto) =>
          acc + (producto.cantidad || 1),
        0
      );
    setCantidadCarrito(
      totalProductos
    );
>>>>>>> 775c66b (Actualiza diseño visual del cliente)
  }, []);

  return (
    <header
      className="
        bg-white/70
        backdrop-blur-md
        border-b
        border-slate-200
        sticky
        top-0
        z-50
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          justify-between
          items-center
        "
      >
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            🍔
            <span className="text-orange-500 ml-1">
              OrderSphere
            </span>
          </h1>
<<<<<<< HEAD

          <p className="text-slate-500">

            Hola 👋{" "}

=======
          <p className="text-slate-500 text-sm">
            Hola 👋
            {" "}
>>>>>>> 775c66b (Actualiza diseño visual del cliente)
            {usuario?.nombre || "Cliente"}
          </p>
        </div>
<<<<<<< HEAD

        <div className="flex items-center gap-6">

          {/* Notificaciones */}

          <button className="relative">

            <Bell size={24} />

=======
        <div className="flex items-center gap-4">
          <button
            className="
              relative
              w-11
              h-11
              rounded-xl
              bg-white
              border
              border-slate-200
              flex
              items-center
              justify-center
              text-slate-600
              hover:text-orange-500
              hover:border-orange-300
              hover:scale-105
              transition-all
              duration-200
            "
          >
            <Bell size={20} />
>>>>>>> 775c66b (Actualiza diseño visual del cliente)
            <span
              className="
                absolute
                -top-1
                -right-1
                w-3
                h-3
                bg-red-500
                rounded-full
                ring-2
                ring-white
              "
            />
          </button>
<<<<<<< HEAD

          {/* Carrito */}

          <button
            className="relative"
            onClick={() =>
              navigate("/carrito")
            }
          >

            <ShoppingCart size={26} />

            {cantidadCarrito > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-orange-500
                  text-white
                  text-xs
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >

                {cantidadCarrito}

              </span>

            )}

          </button>

          {/* Usuario */}

          <button
  onClick={() => navigate("/perfil")}
  className="
    w-12
    h-12
    rounded-full
    bg-gradient-to-r
    from-orange-500
    to-red-500
    flex
    items-center
    justify-center
    text-white
    font-bold
    text-lg
    hover:scale-110
    transition-all
    duration-300
    shadow-lg
  "
>
  {usuario?.nombre
    ? usuario.nombre.charAt(0).toUpperCase()
    : "U"}
</button>

=======
          <button
            className="
              relative
              w-11
              h-11
              rounded-xl
              bg-white
              border
              border-slate-200
              flex
              items-center
              justify-center
              text-slate-600
              hover:text-orange-500
              hover:border-orange-300
              hover:scale-105
              transition-all
              duration-200
            "
          >
            <ShoppingCart size={20} />
            <span
              className="
                absolute
                -top-2
                -right-2
                bg-orange-500
                text-white
                text-xs
                font-bold
                w-5
                h-5
                rounded-full
                flex
                items-center
                justify-center
                shadow-[0_0_10px_rgba(249,115,22,0.5)]
              "
            >
              {cantidadCarrito}
            </span>
          </button>
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-orange-500
              flex
              items-center
              justify-center
              text-white
              hover:scale-105
              transition-all
              duration-200
              hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]
            "
          >
            <User size={20} />
          </div>
>>>>>>> 775c66b (Actualiza diseño visual del cliente)
        </div>
      </div>
    </header>
  );
}

export default HeaderCliente;