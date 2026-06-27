import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, ShoppingCart, RotateCcw, Mic } from "lucide-react";
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
import { obtenerCategorias } from "../../firebase/categorias";

const FLUJO = [
  {
    id: "bienvenida",
    mensaje: "¡Hola! 👋 Soy tu asistente de OrderSphere. Puedes escribirme lo que se te antoja o elegir una opción. ¿Empezamos?",
    opciones: [
      { texto: "🍽 Ver categorías", siguiente: "mostrar_categorias" },
      { texto: "🔥 Productos populares", siguiente: "mostrar_populares" },
      { texto: "🤖 Ayúdame a elegir", siguiente: "tipo_comida" },
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
      { texto: "😐 Poquito", siguiente: "bebida", tamanio: "pequeño" },
      { texto: "😋 Normal", siguiente: "bebida", tamanio: "mediano" },
      { texto: "🐷 Mucha hambre", siguiente: "bebida", tamanio: "grande" },
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
];

function ChatBot() {
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const [mensajes, setMensajes] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const [finalizado, setFinalizado] = useState(false);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [inputTexto, setInputTexto] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);

  // Cargar productos y categorías de Firebase
  useEffect(() => {
    const cargar = async () => {
      try {
        const [dataProductos, dataCategorias] = await Promise.all([
          obtenerProductos(),
          obtenerCategorias(),
        ]);
        setProductos(dataProductos);
        setCategorias(dataCategorias);
      } catch (e) {
        console.error(e);
      }
    };
    cargar();
  }, []);

  // Cargar total del carrito
  useEffect(() => {
    const cargarTotal = async () => {
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
    cargarTotal();
  }, []);

  // Mensaje inicial
  useEffect(() => {
    const paso = FLUJO.find((f) => f.id === "bienvenida");
    setTimeout(() => {
      setMensajes([{
        tipo: "bot",
        texto: paso.mensaje,
        opciones: paso.opciones,
      }]);
    }, 400);
  }, []);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, recomendados, escribiendo]);

  // ================================
  // BUSCAR POR TEXTO LIBRE
  // ================================
  const buscarPorTexto = (texto) => {
    const termino = texto.toLowerCase().trim();

    // Buscar en categorías
    const categoriaEncontrada = categorias.find((c) =>
      c.nombre?.toLowerCase().includes(termino) ||
      termino.includes(c.nombre?.toLowerCase())
    );

    // Buscar en productos
    const productosFiltrados = productos.filter((p) =>
      p.nombre?.toLowerCase().includes(termino) ||
      p.descripcion?.toLowerCase().includes(termino) ||
      p.categoria?.toLowerCase().includes(termino) ||
      (categoriaEncontrada && p.categoria === categoriaEncontrada.nombre)
    );

    return { productosFiltrados, categoriaEncontrada };
  };

  const procesarMensajeUsuario = (texto) => {
    const termino = texto.toLowerCase().trim();

    // Intenciones de navegación
    if (termino.includes("carrito")) {
      setTimeout(() => navigate("/carrito"), 500);
      return [{
        tipo: "bot",
        texto: "🛒 Te llevo al carrito ahora mismo...",
        opciones: [],
      }];
    }

    if (termino.includes("menú") || termino.includes("menu")) {
      setTimeout(() => navigate("/menu"), 500);
      return [{
        tipo: "bot",
        texto: "🍔 Te llevo al menú completo...",
        opciones: [],
      }];
    }

    if (termino.includes("hola") || termino.includes("hi") || termino.includes("buenas")) {
      const paso = FLUJO.find((f) => f.id === "bienvenida");
      return [{
        tipo: "bot",
        texto: "¡Hola de nuevo! 😊 ¿En qué te puedo ayudar?",
        opciones: paso.opciones,
      }];
    }

    if (termino.includes("categoría") || termino.includes("categoria") || termino.includes("categorias")) {
      return mostrarCategorias();
    }

    if (termino.includes("popular") || termino.includes("recomend") || termino.includes("mejor")) {
      return mostrarPopulares();
    }

    // Buscar productos por texto
    const { productosFiltrados, categoriaEncontrada } = buscarPorTexto(texto);

    if (productosFiltrados.length > 0) {
      setRecomendados(productosFiltrados.slice(0, 4));
      setFinalizado(true);
      const msg = categoriaEncontrada
        ? `Encontré ${productosFiltrados.length} producto(s) en la categoría "${categoriaEncontrada.nombre}" 🎉`
        : `Encontré ${productosFiltrados.length} producto(s) que coinciden con "${texto}" 🎉`;
      return [{ tipo: "bot", texto: msg, opciones: [] }];
    }

    // No encontró nada
    return [{
      tipo: "bot",
      texto: `No encontré productos para "${texto}" 😕 Pero puedo mostrarte nuestras categorías o productos populares.`,
      opciones: [
        { texto: "🍽 Ver categorías", siguiente: "mostrar_categorias" },
        { texto: "🔥 Populares", siguiente: "mostrar_populares" },
      ],
    }];
  };

  const mostrarCategorias = () => {
    const opciones = categorias.slice(0, 6).map((c) => ({
      texto: `${c.emoji || "🍽"} ${c.nombre}`,
      siguiente: "filtrar_categoria",
      categoria: c.nombre,
    }));
    return [{
      tipo: "bot",
      texto: "Estas son nuestras categorías disponibles. ¿Cuál te interesa?",
      opciones,
    }];
  };

  const mostrarPopulares = () => {
    const populares = productos.slice(0, 4);
    setRecomendados(populares);
    setFinalizado(true);
    return [{
      tipo: "bot",
      texto: "🔥 Aquí están nuestros productos más populares:",
      opciones: [],
    }];
  };

  const filtrarPorCategoria = (nombreCategoria) => {
    const filtrados = productos.filter((p) =>
      p.categoria?.toLowerCase() === nombreCategoria.toLowerCase()
    );
    if (filtrados.length > 0) {
      setRecomendados(filtrados.slice(0, 4));
      setFinalizado(true);
      return [{
        tipo: "bot",
        texto: `Encontré ${filtrados.length} producto(s) en "${nombreCategoria}" 🎉`,
        opciones: [],
      }];
    }
    return [{
      tipo: "bot",
      texto: `No hay productos en "${nombreCategoria}" aún.`,
      opciones: [{ texto: "🍽 Ver otras categorías", siguiente: "mostrar_categorias" }],
    }];
  };

  // ================================
  // MANEJAR ENVÍO DE TEXTO
  // ================================
  const enviarMensaje = () => {
    const texto = inputTexto.trim();
    if (!texto) return;

    setInputTexto("");
    setRecomendados([]);
    setFinalizado(false);

    const nuevosMensajes = [
      ...mensajes.map((m) => ({ ...m, opciones: [] })),
      { tipo: "usuario", texto },
    ];
    setMensajes(nuevosMensajes);

    setEscribiendo(true);
    setTimeout(() => {
      setEscribiendo(false);
      const respuestas = procesarMensajeUsuario(texto);
      setMensajes([...nuevosMensajes, ...respuestas]);
    }, 800);
  };

  // ================================
  // MANEJAR OPCIONES
  // ================================
  const manejarOpcion = (opcion) => {
    const nuevasSelecciones = { ...selecciones, ...opcion };
    setSelecciones(nuevasSelecciones);
    setRecomendados([]);
    setFinalizado(false);

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
    if (opcion.siguiente === "mostrar_categorias") {
      setTimeout(() => {
        const resp = mostrarCategorias();
        setMensajes([...nuevosMensajes, ...resp]);
      }, 500);
      return;
    }
    if (opcion.siguiente === "mostrar_populares") {
      setTimeout(() => {
        const resp = mostrarPopulares();
        setMensajes([...nuevosMensajes, ...resp]);
      }, 500);
      return;
    }
    if (opcion.siguiente === "filtrar_categoria") {
      setTimeout(() => {
        const resp = filtrarPorCategoria(opcion.categoria);
        setMensajes([...nuevosMensajes, ...resp]);
      }, 500);
      return;
    }
    if (opcion.siguiente === "recomendacion") {
      setTimeout(() => {
        let filtrados = [...productos];
        if (nuevasSelecciones.filtro) {
          const por = filtrados.filter((p) =>
            p.categoria?.toLowerCase().includes(nuevasSelecciones.filtro) ||
            p.nombre?.toLowerCase().includes(nuevasSelecciones.filtro) ||
            p.descripcion?.toLowerCase().includes(nuevasSelecciones.filtro)
          );
          if (por.length > 0) filtrados = por;
        }
        const rec = filtrados.slice(0, 4);
        setRecomendados(rec);
        setFinalizado(true);
        setMensajes([
          ...nuevosMensajes,
          {
            tipo: "bot",
            texto: rec.length > 0
              ? "¡Perfecto! 🎉 Te recomiendo estos platillos:"
              : "No encontré productos exactos, pero aquí tienes los más populares:",
            opciones: [],
          },
        ]);
      }, 800);
      return;
    }

    setTimeout(() => {
      const paso = FLUJO.find((f) => f.id === opcion.siguiente);
      if (paso) {
        setMensajes([
          ...nuevosMensajes,
          { tipo: "bot", texto: paso.mensaje, opciones: paso.opciones },
        ]);
      }
    }, 600);
  };

  // ================================
  // AGREGAR AL CARRITO (FIRESTORE)
  // ================================
  const agregarAlCarrito = async (producto) => {
    try {
      const usuario = auth.currentUser;
      if (!usuario) {
        alert("Debes iniciar sesión para agregar al carrito.");
        return;
      }

      const q = query(
        collection(db, "carritos"),
        where("id_cliente", "==", usuario.uid),
        where("estado", "==", "proceso")
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        await addDoc(collection(db, "carritos"), {
          id_cliente: usuario.uid,
          estado: "proceso",
          items: [{ id_item: producto.id, cantidad: 1, tipo: "producto" }],
          creado_en: serverTimestamp(),
        });
        setTotalCarrito(1);
      } else {
        const carritoDoc = snapshot.docs[0];
        const itemsActuales = carritoDoc.data().items || [];
        const yaExiste = itemsActuales.findIndex((i) => i.id_item === producto.id);

        let nuevosItems;
        if (yaExiste >= 0) {
          nuevosItems = itemsActuales.map((i) =>
            i.id_item === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
          );
        } else {
          nuevosItems = [
            ...itemsActuales,
            { id_item: producto.id, cantidad: 1, tipo: "producto" },
          ];
        }

        await updateDoc(doc(db, "carritos", carritoDoc.id), { items: nuevosItems });
        setTotalCarrito(nuevosItems.length);
      }

      setMensajes((prev) => [
        ...prev,
        {
          tipo: "bot",
          texto: `✅ ¡${producto.nombre} agregado al carrito!`,
          opciones: [
            { texto: "🛒 Ir al carrito", siguiente: "ir_carrito" },
            { texto: "🍔 Seguir comprando", siguiente: "mostrar_populares" },
          ],
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMensajes((prev) => [
        ...prev,
        { tipo: "bot", texto: "❌ Error al agregar. Intenta de nuevo.", opciones: [] },
      ]);
    }
  };

  const reiniciar = () => {
    setMensajes([]);
    setSelecciones({});
    setRecomendados([]);
    setFinalizado(false);
    setInputTexto("");
    setTimeout(() => {
      const paso = FLUJO.find((f) => f.id === "bienvenida");
      setMensajes([{ tipo: "bot", texto: paso.mensaje, opciones: paso.opciones }]);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden flex flex-col pb-20 md:pb-0">

      <div className="fixed w-100 h-100 bg-orange-500/15 rounded-full blur-[140px] -left-32 bottom-0 pointer-events-none z-0" />
      <div className="fixed w-75 h-75 bg-purple-500/10 rounded-full blur-[140px] -right-20 top-0 pointer-events-none z-0" />

      {/* NAVBAR */}
      <nav className="relative z-50 flex items-center justify-between gap-2 px-3 sm:px-6 py-3 sm:py-4 border-b border-white/8 backdrop-blur-md bg-[#050816]/80 top-0">
        <button
          onClick={() => navigate("/inicio")}
          className="flex items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-white transition-colors shrink-0"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Volver</span>
        </button>
        <div className="text-sm sm:text-lg font-black text-white text-center truncate px-1">
          🤖 <span className="hidden xs:inline">Asistente</span> <span className="text-orange-500">OrderSphere</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {totalCarrito > 0 && (
            <button
              onClick={() => navigate("/carrito")}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold hover:bg-orange-500/20 transition-all"
            >
              <ShoppingCart size={16} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {totalCarrito}
              </span>
            </button>
          )}
          <button
            onClick={reiniciar}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shrink-0"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </nav>

      {/* CHAT */}
      <div className="relative z-10 flex-1 overflow-y-auto px-3 sm:px-4 py-5 sm:py-6 pb-4 space-y-4 max-w-2xl mx-auto w-full">

        {mensajes.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.tipo === "usuario" ? "items-end" : "items-start"}`}>
            <div className={`max-w-[85%] sm:max-w-[80%] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-sm leading-relaxed ${
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
              <div className="flex flex-wrap gap-2 mt-3 max-w-full sm:max-w-[90%]">
                {msg.opciones.map((op, j) => (
                  <button
                    key={j}
                    onClick={() => manejarOpcion(op)}
                    className="px-3.5 sm:px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm font-semibold hover:bg-orange-500/20 hover:border-orange-500/40 hover:text-orange-300 transition-all duration-200 active:scale-95"
                  >
                    {op.texto}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Indicador escribiendo */}
        {escribiendo && (
          <div className="flex items-start">
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none">
              <span className="text-orange-400 font-bold text-xs block mb-1">🤖 Asistente</span>
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RECOMENDACIONES */}
        {finalizado && recomendados.length > 0 && (
          <div className="space-y-3 mt-2">
            {recomendados.map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 hover:border-orange-500/30 transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={prod.imagen || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80"}
                      alt={prod.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-sm truncate">{prod.nombre}</h4>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{prod.descripcion || "Platillo delicioso"}</p>
                    {prod.categoria && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-semibold">
                        {prod.categoria}
                      </span>
                    )}
                    <div className="text-orange-400 font-black text-base mt-1">${prod.precio}</div>
                  </div>
                </div>
                <button
                  onClick={() => agregarAlCarrito(prod)}
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white px-4 py-2.5 sm:py-2 rounded-xl font-bold text-xs transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                >
                  <ShoppingCart size={14} /> Agregar
                </button>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
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

      {/* INPUT */}
      <div className="relative z-10 px-3 sm:px-4 py-3 sm:py-4 border-t border-white/5 bg-[#050816]/80 backdrop-blur-md max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white/5 border border-white/10 focus-within:border-orange-500/40 transition-colors">
          <input
            ref={inputRef}
            type="text"
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
            placeholder="Escribe lo que se te antoja..."
            className="flex-1 min-w-0 bg-transparent text-white text-sm placeholder:text-slate-600 outline-none"
          />
          <button
            onClick={enviarMensaje}
            disabled={!inputTexto.trim()}
            className="w-8 h-8 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:bg-white/10 disabled:text-slate-600 flex items-center justify-center text-white transition-all shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-slate-700 text-[11px] sm:text-xs text-center mt-2">
          Escribe o selecciona una opción · Enter para enviar
        </p>
      </div>

      <BottomNav />
    </div>
  );
}

export default ChatBot;