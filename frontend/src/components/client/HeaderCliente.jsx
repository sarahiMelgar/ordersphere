import { Bell, ShoppingCart, User } from "lucide-react";

function HeaderCliente() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-black">
            🍔 <span className="text-orange-500">OrderSphere</span>
          </h1>

          <p className="text-slate-500">
            Hola 👋 ¿Qué deseas ordenar hoy?
          </p>

        </div>

        <div className="flex items-center gap-6">

          <button className="relative">

            <Bell size={24} />

            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />

          </button>

          <button className="relative">

            <ShoppingCart size={26} />

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
              0
            </span>

          </button>

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-orange-500
              flex
              items-center
              justify-center
              text-white
            "
          >
            <User />
          </div>

        </div>

      </div>

    </header>
  );
}

export default HeaderCliente;