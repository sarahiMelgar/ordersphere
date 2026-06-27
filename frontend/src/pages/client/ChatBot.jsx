import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, ShoppingCart, RotateCcw } from "lucide-react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";
import BottomNav from "../../components/client/BottomNav";
import { obtenerProductos } from "../../firebase/productos";

const FLUJO = [
  {
    id: "bienvenida",
    mensaje: "¡Hola! 👋 Soy tu asistente de OrderSphere. Voy a ayudarte a encontrar el platillo perfecto para ti. ¿Empezamos?",
    opciones: [
      { texto: "¡Claro que sí! 🎉", siguiente: "tipo_comida" },
      { texto: "Solo quiero ver el menú 🍽", siguiente: "ver_menu" },
    ],
  },
  {
    id: "tipo_comida",
    mensaje: "¿Qué tipo de comida se te antoja?",
    opciones: [
      { texto: "🧂 Salada", siguiente: "nivel_hambre", filtro: "salada" },
      { texto: "🍬 Dulce", siguiente: "nivel_hambre", filtro: "dulce" },
      { texto: "🌶 Picante", siguiente: "nivel_hambre", filtro: "picante" },
      { texto: "🥗 Saludable", siguiente: "nivel_hambre", filtro: "saludable" },
    ],
  },
  {
    id: "nivel_hambre",
    mensaje: "¿Qué tanto hambre tienes? 😄",
    opciones: [
      { texto: "😐 Poquito", siguiente: "para_quien", tamanio: "pequeño" },
      { texto: "😋 Normal", siguiente: "para_quien", tamanio: "mediano" },
      { texto: "🐷 Mucha hambre", siguiente: "para_quien", tamanio: "grande" },
    ],
  },
  {
    id: "para_quien",
    mensaje: "¿Para cuántas personas es el pedido?",
    opciones: [
      { texto: "👤 Solo para mí", siguiente: "bebida", personas: 1 },
      { texto: "👫 Para 2", siguiente: "bebida", personas: 2 },
      { texto: "👨‍👩‍👧 Familiar", siguiente: "bebida", personas: 4 },
    ],
  },
  {
    id: "bebida",
    mensaje: "¿Te gustaría agregar una bebida?",
    opciones: [
      { texto: "🥤 Sí, con bebida", siguiente: "recomendacion", bebida: true },
      { texto: "❌ No gracias", siguiente: "recomendacion", bebida: false },
    ],
  },
  {
    id: "ver_menu",
    mensaje: "¡Perfecto! Te llevo directo al menú completo. 🍔",
    opciones: [
      { texto: "Ir al Menú →", siguiente: "ir_menu" },
    ],
  },
];

function ChatBot() {
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [mensajes, setMensajes] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [productos, setProductos] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const [finalizado, setFinalizado] = useState(false);
  const [totalCarrito, setTotalCarrito] = useState(0);

  // Cargar productos de Firebase
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (e) {
        console.error(e);
      }
    };
    cargar();
  }, []);

  // Cargar total del carrito actual
  useEffect(() => {
    const cargarTotalCarrito = async () => {
      try {
        if (!auth.currentUser) return;
        const q = query(
          collection(db, "carritos"),
          where("id_cliente", "==", auth.currentUser.uid),
          where("estado", "==", "proceso")
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const items = snapshot.docs[0].data().items || [];
          setTotalCarrito(items.length);
        }
      } catch (e) {
        console.error(e);
      }
    };
    cargarTotalCarrito();
  }, []);

  // Mensaje inicial
  useEffect(() => {
    const paso = FLUJO.find((f) => f.id === "bienvenida");
    setTimeout(() => {
      setMensajes([{
        tipo: "bot",
        texto: paso.mensaje,
        opciones: paso.opciones,
        id: paso.id,
      }]);
    }, 400);
  }, []);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, recomendados]);

  const manejarOpcion = (opcion) => {
    const nuevasSelecciones = { ...selecciones, ...opcion };
    setSelecciones(nuevasSelecciones);

    const nuevosMensajes = [
      ...mensajes.map((m) => ({ ...m, opciones: [] })),
      { tipo: "usuario", texto: opcion.texto },
    ];

    setMensajes(nuevosMensajes);

    if (opcion.siguiente === "ir_menu") {
      setTimeout(() => navigate("/menu"), 600);
      return;
    }

    if (opcion.siguiente === "ir_carrito") {
      setTimeout(() => navigate("/carrito"), 400);
      return;
    }

    if (opcion.siguiente === "recomendacion") {
      setTimeout(() => mostrarRecomendacion(nuevasSelecciones, nuevosMensajes), 800);
      return;
    }

    setTimeout(() => {
      const paso = FLUJO.find((f) => f.id === opcion.siguiente);
      if (paso) {
        setMensajes([
          ...nuevosMensajes,
          { tipo: "bot", texto: paso.mensaje, opciones: paso.opciones, id: paso.id },
        ]);
      }
    }, 600);
  };

  const mostrarRecomendacion = (sels, msgActuales) => {
    let filtrados = [...productos];

    if (sels.filtro && filtrados.length > 0) {
      const porCategoria = filtrados.filter((p) =>
        p.categoria?.toLowerCase().includes(sels.filtro) ||
        p.nombre?.toLowerCase().includes(sels.filtro) ||
        p.descripcion?.toLowerCase().includes(sels.filtro)
      );
      if (porCategoria.length > 0) filtrados = porCategoria;
    }

    const rec = filtrados.slice(0, 3);
    setRecomendados(rec);
    setFinalizado(true);

    setMensajes([
      ...msgActuales,
      {
        tipo: "bot",
        texto: rec.length > 0
          ? "¡Perfecto! 🎉 Basándome en tus preferencias, te recomiendo estos platillos:"
          : "No encontré productos exactos, pero aquí tienes nuestros más populares:",
        opciones: [],
      },
    ]);
  };

  const agregarAlCarrito = async (producto) => {
    try {
      const usuario = auth.currentUser;
      if (!usuario) {
        alert("Debes iniciar sesión para agregar al carrito.");
        return;
      }

      // Buscar carrito en proceso
      const q = query(
        collection(db, "carritos"),
        where("id_cliente", "==", usuario.uid),
        where("estado", "==", "proceso")
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        // Crear carrito nuevo
        await addDoc(collection(db, "carritos"), {
          id_cliente: usuario.uid,
          estado: "proceso",
          items: [{ id_item: producto.id, cantidad: 1, tipo: "producto" }],
          creado_en: serverTimestamp(),
        });
        setTotalCarrito(1);
      } else {
        // Agregar al carrito existente
        const carritoDoc = snapshot.docs[0];
        const itemsActuales = carritoDoc.data().items || [];
        const yaExiste = itemsActuales.findIndex((i) => i.id_item === producto.id);

        let nuevosItems;
        if (yaExiste >= 0) {
          nuevosItems = itemsActuales.map((i) =>
            i.id_item === producto.id
              ? { ...i, cantidad: i.cantidad + 1 }
              : i
          );
        } else {
          nuevosItems = [
            ...itemsActuales,
            { id_item: producto.id, cantidad: 1, tipo: "producto" },
          ];
        }

        await updateDoc(doc(db, "carritos", carritoDoc.id), {
          items: nuevosItems,
        });
        setTotalCarrito(nuevosItems.length);
      }

      setMensajes((prev) => [
        ...prev,
        {
          tipo: "bot",
          texto: `✅ ¡${producto.nombre} agregado al carrito! ¿Quieres algo más?`,
          opciones: [
            { texto: "🛒 Ir al carrito", siguiente: "ir_carrito" },
            { texto: "🍔 Ver más productos", siguiente: "ir_menu" },
          ],
        },
      ]);
    } catch (error) {
      console.error("Error agregando al carrito:", error);
      setMensajes((prev) => [
        ...prev,
        {
          tipo: "bot",
          texto: "❌ Hubo un error al agregar el producto. Intenta de nuevo.",
          opciones: [],
        },
      ]);
    }
  };

  const reiniciar = () => {
    setMensajes([]);
    setSelecciones({});
    setRecomendados([]);
    setFinalizado(false);
    setTimeout(() => {
      const paso = FLUJO.find((f) => f.id === "bienvenida");
      setMensajes([{
        tipo: "bot",
        texto: paso.mensaje,
        opciones: paso.opciones,
        id: paso.id,
      }]);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden flex flex-col">

      {/* Glows */}
      <div className="fixed w-100 h-100 bg-orange-500/15 rounded-full blur-[140px] -left-32 bottom-0 pointer-events-none z-0" />
      <div className="fixed w-75 h-75 bg-purple-500/10 rounded-full blur-[140px] -right-20 top-0 pointer-events-none z-0" />

      {/* NAVBAR */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-white/8 backdrop-blur-md bg-[#050816]/80 top-0">
        <button
          onClick={() => navigate("/inicio")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <div className="text-lg font-black text-white">
          🤖 Asistente <span className="text-orange-500">OrderSphere</span>
        </div>

        <div className="flex items-center gap-3">
          {totalCarrito > 0 && (
            <button
              onClick={() => navigate("/carrito")}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold hover:bg-orange-500/20 transition-all"
            >
              <ShoppingCart size={16} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {totalCarrito}
              </span>
            </button>
          )}
          <button
            onClick={reiniciar}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </nav>

      {/* CHAT */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 pb-4 space-y-4 max-w-2xl mx-auto w-full">

        {mensajes.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.tipo === "usuario" ? "items-end" : "items-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.tipo === "bot"
                ? "bg-white/5 border border-white/10 text-white rounded-tl-none"
                : "bg-orange-500 text-white rounded-tr-none"
            }`}>
              {msg.tipo === "bot" && (
                <span className="text-orange-400 font-bold text-xs block mb-1">🤖 Asistente</span>
              )}
              {msg.texto}
            </div>

            {msg.opciones && msg.opciones.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 max-w-[90%]">
                {msg.opciones.map((op, j) => (
                  <button
                    key={j}
                    onClick={() => manejarOpcion(op)}
                    className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-orange-500/20 hover:border-orange-500/40 hover:text-orange-300 transition-all duration-200 active:scale-95"
                  >
                    {op.texto}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* RECOMENDACIONES */}
        {finalizado && recomendados.length > 0 && (
          <div className="space-y-3 mt-2">
            {recomendados.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-orange-500/30 transition-all"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={prod.imagen || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80"}
                    alt={prod.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-sm truncate">{prod.nombre}</h4>
                  <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{prod.descripcion || "Platillo delicioso"}</p>
                  <span className="text-orange-400 font-black text-base">${prod.precio}</span>
                </div>
                <button
                  onClick={() => agregarAlCarrito(prod)}
                  className="shrink-0 flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                >
                  <ShoppingCart size={14} /> Agregar
                </button>
              </div>
            ))}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => navigate("/menu")}
                className="flex-1 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm hover:bg-white/10 transition-all"
              >
                Ver menú completo
              </button>
              <button
                onClick={() => navigate("/carrito")}
                className="flex-1 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
              >
                Ir al carrito 🛒
              </button>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT decorativo */}
      <div className="relative z-10 px-4 py-4 border-t border-white/5 bg-[#050816]/80 backdrop-blur-md max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-slate-600 text-sm flex-1">Selecciona una opción de arriba...</p>
          <Send size={16} className="text-slate-700" />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default ChatBot;