import {
  House,
  FolderTree,
  Package,
  ShoppingCart,
  Gift,
  Users,
  SettingsIcon,
  LogOut
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const cerrarSesion = () => {
    // Elimina datos de sesión si existen
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    // Redirige al login
    navigate("/");
  };

  const menu = [
    {
      icon: <House size={22} />,
      name: "Inicio",
      path: "/dashboard"
    },
    {
      icon: <FolderTree size={22} />,
      name: "Categorías",
      path: "/categorias"
    },
    {
      icon: <Package size={22} />,
      name: "Productos",
      path: "/productos"
    },
    {
      icon: <ShoppingCart size={22} />,
      name: "Pedidos",
      path: "/pedidos"
    },
    {
      icon: <Gift size={22} />,
      name: "Promociones",
      path: "/promociones"
    },
    {
      icon: <Users size={22} />,
      name: "Clientes",
      path: "/clientes"
    },
    {
      icon: <SettingsIcon size={22} />,
      name: "Settings",
      path: "/settings"
    }
  ];

  return (
    <aside className="w-24 bg-slate-950 min-h-screen flex flex-col items-center py-6">

      {/* Logo */}
      <div className="mb-10">
        <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
          🍔
        </div>
      </div>

      {/* Menú */}
      <div className="flex flex-col gap-4">

        {menu.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            title={item.name}
            className={`
              w-14 h-14 rounded-2xl flex items-center justify-center
              transition-all duration-300
              ${
                location.pathname === item.path
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }
            `}
          >
            {item.icon}
          </button>
        ))}

      </div>

      {/* Parte inferior */}
      <div className="mt-auto flex flex-col items-center gap-4">

        <button
          onClick={cerrarSesion}
          title="Cerrar Sesión"
          className="
            w-14 h-14
            rounded-2xl
            flex items-center justify-center
            bg-red-500
            text-white
            hover:bg-red-600
            transition-all duration-300
            shadow-lg
          "
        >
          <LogOut size={22} />
        </button>

        <div className="w-12 h-12 rounded-full bg-orange-500 border-4 border-slate-800" />

      </div>

    </aside>
  );
}

export default Sidebar;