import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { agregarAlCarrito } from "../../firebase/AgregarCarrito";
import { auth } from "../../firebase/firebaseConfig";

function ProductoCard({
  id,
  nombre,
  precio,
  imagen
}) {

  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAgregarAlCarrito = async () => {

    if (!auth.currentUser) {
      alert("Debes iniciar sesión");
      return;
    }

    try {

      setLoading(true);

      await agregarAlCarrito({
        idCliente: auth.currentUser.uid,
        idItem: id,
        tipo: "producto",
        cantidad
      });

      alert(
        `${cantidad} ${nombre} agregado(s) al carrito 🛒`
      );

      setCantidad(1);

      window.dispatchEvent(
        new Event("carritoActualizado")
      );

    } catch (error) {

      console.error(error);

      alert(
        "Error al agregar al carrito"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        bg-white/70
        backdrop-blur-sm
        rounded-2xl
        overflow-hidden
        border
        border-slate-200
        shadow-sm
        hover:shadow-md
        hover:border-orange-300
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      <img
        src={imagen}
        alt={nombre}
        className="
          h-40
          w-full
          object-cover
        "
      />

      <div className="p-5">

        <h3 className="font-bold text-slate-900 text-base">
          {nombre}
        </h3>

        <p className="text-slate-500 text-sm mt-1">
          Delicioso producto preparado al momento.
        </p>

        <div className="flex justify-between items-center mt-4">

          <span className="text-xl font-black text-orange-500">
            ${precio}
          </span>

        </div>

        <div className="flex items-center justify-center gap-3 mt-4">

          <button
            onClick={() =>
              setCantidad(
                cantidad > 1
                  ? cantidad - 1
                  : 1
              )
            }
            className="
              w-9
              h-9
              rounded-xl
              bg-slate-100
              border
              border-slate-200
              text-slate-600
              flex
              items-center
              justify-center
              hover:bg-slate-200
              transition
            "
          >
            <Minus size={14}/>
          </button>

          <span
            className="
              font-bold
              text-lg
              w-8
              text-center
            "
          >
            {cantidad}
          </span>

          <button
            onClick={() =>
              setCantidad(cantidad + 1)
            }
            className="
              w-9
              h-9
              rounded-xl
              bg-orange-500
              text-white
              flex
              items-center
              justify-center
              hover:bg-orange-400
              transition
            "
          >
            <Plus size={14}/>
          </button>

        </div>

        <button
          onClick={handleAgregarAlCarrito}
         
          disabled={loading}
          className={`
            w-full
            mt-4
            py-3
            rounded-xl
            font-bold
            flex
            items-center
            justify-center
            gap-2
            transition-all
            ${
              loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-400 text-white"
            }
          `}
        >
          <ShoppingCart size={18} />

          {
            loading
            ? "Agregando..."
            : "Agregar Producto"
          }

        </button>

      </div>

    </div>

  );

}

export default ProductoCard;