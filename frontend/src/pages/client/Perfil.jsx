import { useState } from "react";
import BottomNav from "../../components/client/BottomNav";
import { 
  LogOut, 
  User, 
  Mail, 
  Shield, 
  CircleDot,
  UserCircle,
  Activity,
  BadgeCheck,
  Menu,
  X,
  ShoppingCart,
  Home,
  UtensilsCrossed,
  Clock,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Perfil() {

  // ==========================
  // NAVEGACIÓN
  // ==========================

  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // ==========================
  // DATOS DEL USUARIO
  // ==========================

  const nombre =
    localStorage.getItem("nombre") ||
    "Usuario";

  const correo =
    localStorage.getItem("correo") ||
    "Sin correo";

  const rol =
    localStorage.getItem("rol") ||
    "cliente";

  // ==========================
  // CERRAR SESIÓN
  // ==========================

  const cerrarSesion = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.removeItem("rol");

    navigate("/");

  };

  // Determinar si es admin
  const esAdmin = rol === "admin";

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pb-28">

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
      <div className="md:hidden fixed inset-0 z-40 bg-gradient-to-br from-slate-50 to-slate-100 backdrop-blur-xl flex flex-col pt-24 px-8">
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
          <p className="text-slate-900 font-black text-lg">👋 Hola, {nombre}</p>
          <p className="text-slate-500 text-sm mt-1">{correo}</p>
        </div>
      </div>
    )}

    <div className="p-6">
      {/* ==========================
          ENCABEZADO
      ========================== */}

      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 text-white shadow-xl mb-8 transition-all hover:shadow-2xl">
        <div className="flex items-center gap-4">
          <UserCircle size={48} strokeWidth={1.5} />
          <div>
            <h2 className="text-4xl font-bold">
              {esAdmin ? "Perfil Administrador" : "Mi Perfil"}
            </h2>
            <p className="mt-1 text-orange-100 text-lg opacity-90">
              Administra tu información personal
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* ==========================
            INFORMACIÓN USUARIO (columna principal)
        ========================== */}

        <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">

          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2">
            <User className="text-orange-500" size={24} />
            Información Personal
          </h3>

          {/* Avatar y nombre */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-5xl text-white font-bold shadow-lg ring-4 ring-orange-200 dark:ring-orange-800">
                {nombre.charAt(0).toUpperCase()}
              </div>
              {esAdmin && (
                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1.5 shadow-lg">
                  <Shield size={18} className="text-white" />
                </div>
              )}
            </div>
            <div>
              <h4 className="text-2xl font-bold dark:text-white">{nombre}</h4>
              <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                {esAdmin ? (
                  <>
                    <Shield size={16} className="text-blue-500" />
                    Administrador
                  </>
                ) : (
                  <>
                    <BadgeCheck size={16} className="text-green-500" />
                    Cliente
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Campos de información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-1">
                <User size={16} className="text-orange-500" />
                Nombre
              </label>
              <input
                value={nombre}
                readOnly
                className="w-full bg-slate-100 dark:bg-slate-700 border-0 rounded-xl p-3 text-slate-800 dark:text-white font-medium cursor-default"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-1">
                <Mail size={16} className="text-orange-500" />
                Correo
              </label>
              <input
                value={correo}
                readOnly
                className="w-full bg-slate-100 dark:bg-slate-700 border-0 rounded-xl p-3 text-slate-800 dark:text-white font-medium cursor-default"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-1">
                <Shield size={16} className="text-orange-500" />
                Rol
              </label>
              <input
                value={rol}
                readOnly
                className="w-full bg-slate-100 dark:bg-slate-700 border-0 rounded-xl p-3 text-slate-800 dark:text-white font-medium cursor-default"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-1">
                <CircleDot size={16} className="text-green-500" />
                Estado
              </label>
              <input
                value="Online"
                readOnly
                className="w-full bg-slate-100 dark:bg-slate-700 border-0 rounded-xl p-3 text-green-600 dark:text-green-400 font-medium cursor-default"
              />
            </div>
          </div>
        </div>

        {/* ==========================
            ACTIVIDAD Y ACCIONES (columna lateral)
        ========================== */}

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-fit">

          <h3 className="text-2xl font-bold dark:text-white mb-8 flex items-center gap-2">
            <Activity className="text-orange-500" size={24} />
            Actividad
          </h3>

          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-700 pb-5">
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Shield size={16} />
                Rol del Sistema
              </p>
              <p className="text-xl font-bold text-orange-500 mt-1">
                {rol}
              </p>
            </div>

            <div className="border-b border-slate-200 dark:border-slate-700 pb-5">
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Mail size={16} />
                Correo registrado
              </p>
              <p className="text-slate-700 dark:text-slate-300 break-all mt-1 font-medium">
                {correo}
              </p>
            </div>

            <div className="border-b border-slate-200 dark:border-slate-700 pb-5">
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <CircleDot size={16} />
                Estado
              </p>
              <p className="text-green-500 font-bold flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>

            {/* CERRAR SESIÓN */}
            <button
              onClick={cerrarSesion}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <LogOut size={22} />
              Cerrar Sesión
            </button>
          </div>
        </div>

      </div>

      {/* MENÚ INFERIOR SOLO CLIENTE */}
       </div>
      {!esAdmin && (
         
        <BottomNav />
      )}

    </div>

  );
}

export default Perfil;