import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  ArrowRight
} from "lucide-react";

import { registerUser } from "../firebase/registerUser";

function Register() {

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {

    try {

      setLoading(true);
      setError("");

      await registerUser(
        nombre,
        email,
        password
      );

      navigate("/menu");

    } catch (err) {

      console.error("ERROR REGISTER:", err);

  setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">

        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            🍔
          </div>

          <h1 className="text-5xl font-black text-white">
            Crear Cuenta
          </h1>

          <p className="text-slate-400 mt-2">
            Únete a OrderSphere
          </p>

        </div>

        <div className="space-y-5">

          <div className="relative">

            <User
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              className="w-full pl-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white"
            />

          </div>

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full pl-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white"
            />

          </div>

          <div className="relative">

            <Lock
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full pl-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white"
            />

          </div>

          {error && (

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-center">

              {error}

            </div>

          )}

          <button
            onClick={handleRegister}
            className="
              w-full
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-orange-500
              to-orange-600
              text-white
              font-bold
              flex
              justify-center
              items-center
              gap-2
            "
          >
            {loading
              ? "Creando cuenta..."
              : "Crear Cuenta"}

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;