import { useState } from "react";
import { X, CreditCard, Banknote, Landmark, Check, Loader2 } from "lucide-react";

function ModalPago({ total, onClose, onConfirmar }) {
  const [metodo, setMetodo] = useState("tarjeta"); // tarjeta | efectivo | transferencia
  const [procesando, setProcesando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  // Datos de tarjeta
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");

  const formatearNumeroTarjeta = (valor) => {
    const limpio = valor.replace(/\D/g, "").slice(0, 16);
    return limpio.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatearVencimiento = (valor) => {
    const limpio = valor.replace(/\D/g, "").slice(0, 4);
    if (limpio.length <= 2) return limpio;
    return `${limpio.slice(0, 2)}/${limpio.slice(2)}`;
  };

  const tarjetaValida =
    numeroTarjeta.replace(/\s/g, "").length === 16 &&
    nombreTarjeta.trim().length > 2 &&
    vencimiento.length === 5 &&
    cvv.length === 3;

  const puedeConfirmar = metodo !== "tarjeta" || tarjetaValida;

  const handleConfirmar = () => {
    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      setConfirmado(true);
      setTimeout(() => {
        onConfirmar(metodo);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">

        {!confirmado && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X size={18} />
          </button>
        )}

        {confirmado ? (
          /* ===== PANTALLA DE ÉXITO ===== */
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
              <Check size={40} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              ¡Pedido confirmado!
            </h3>
            <p className="text-slate-500 mt-2">
              Tu pago fue procesado correctamente.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
              💳 Confirmar Pago
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Selecciona tu método de pago preferido.
            </p>

            {/* Selector de método */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: "tarjeta", label: "Tarjeta", icon: <CreditCard size={18} /> },
                { id: "efectivo", label: "Efectivo", icon: <Banknote size={18} /> },
                { id: "transferencia", label: "Transferencia", icon: <Landmark size={18} /> },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMetodo(m.id)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-bold transition-all duration-200 ${
                    metodo === m.id
                      ? "border-orange-500 bg-orange-50 text-orange-500"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {m.icon}
                  {m.label}
                </button>
              ))}
            </div>

            {/* Formulario según método */}
            {metodo === "tarjeta" && (
              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">
                    Número de tarjeta
                  </label>
                  <input
                    value={numeroTarjeta}
                    onChange={(e) => setNumeroTarjeta(formatearNumeroTarjeta(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">
                    Nombre del titular
                  </label>
                  <input
                    value={nombreTarjeta}
                    onChange={(e) => setNombreTarjeta(e.target.value)}
                    placeholder="Como aparece en la tarjeta"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">
                      Vencimiento
                    </label>
                    <input
                      value={vencimiento}
                      onChange={(e) => setVencimiento(formatearVencimiento(e.target.value))}
                      placeholder="MM/AA"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">
                      CVV
                    </label>
                    <input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      placeholder="123"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {metodo === "efectivo" && (
              <div className="mb-6 p-4 rounded-xl bg-orange-50 border border-orange-200">
                <p className="text-sm text-slate-700">
                  💵 Pagarás <strong>${total}</strong> en efectivo directamente al repartidor cuando recibas tu pedido.
                </p>
              </div>
            )}

            {metodo === "transferencia" && (
              <div className="mb-6 p-4 rounded-xl bg-orange-50 border border-orange-200 space-y-2">
                <p className="text-sm text-slate-700 font-semibold">
                  🏦 Datos para transferencia:
                </p>
                <p className="text-sm text-slate-600">Banco: BBVA</p>
                <p className="text-sm text-slate-600">CLABE: 0123 4567 8901 2345 67</p>
                <p className="text-sm text-slate-600">Beneficiario: OrderSphere SA de CV</p>
                <p className="text-xs text-slate-400 mt-2">
                  Tu pedido se preparará al confirmar tu comprobante de pago.
                </p>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center py-4 border-t border-slate-200 mb-4">
              <span className="text-slate-600 font-medium">Total a pagar</span>
              <span className="text-2xl font-black text-orange-500 tracking-tight">
                ${total}
              </span>
            </div>

            <button
              onClick={handleConfirmar}
              disabled={!puedeConfirmar || procesando}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white py-3.5 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {procesando ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Procesando...
                </>
              ) : (
                "Confirmar Pago"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalPago;