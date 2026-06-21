import {
  House,
  UtensilsCrossed,
  ShoppingCart,
  Package,
  User
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      icon: <House size={24} />,
      name: "Inicio",
      path: "/inicio"
    },
    {
      icon: <UtensilsCrossed size={24} />,
      name: "Menú",
      path: "/menu"
    },
    {
      icon: <ShoppingCart size={24} />,
      name: "Carrito",
      path: "/carrito",
      badge: 0
    },
    {
      icon: <Package size={24} />,
      name: "Pedidos",
      path: "/pedidoscliente"
    },
    {
      icon: <User size={24} />,
      name: "Perfil",
      path: "/perfil"
    }
  ];

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        border-t
        border-slate-200
        shadow-lg
        flex
        justify-around
        py-3
        z-50
      "
    >
      {menu.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          title={item.name}
          className={`
            relative
            flex
            flex-col
            items-center
            justify-center
            transition-all
            duration-300
            ${
              location.pathname === item.path
                ? "text-orange-500"
                : "text-slate-500 hover:text-orange-500"
            }
          `}
        >
          {item.icon}

          {item.badge !== undefined && (
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
              {item.badge}
            </span>
          )}

          <span className="text-[10px] mt-1">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
}

export default BottomNav;