import { ArrowRight } from "lucide-react";

function HeroCliente() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        p-8
        border
        border-orange-200
        bg-white/60
        backdrop-blur-sm
        shadow-sm
      "
    >
      <div className="absolute right-4 top-2 text-[140px] opacity-10 pointer-events-none">
        🍔
      </div>
      <p className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-2">
        ✦ Oferta especial
      </p>
      <h2 className="text-4xl font-black text-slate-900 tracking-tight">
        🔥 20% OFF
      </h2>
      <p className="mt-2 text-slate-500 text-lg">
        En todas las hamburguesas premium
      </p>
      <button
        className="
          mt-6
          flex
          items-center
          gap-2
          bg-orange-500
          hover:bg-orange-400
          text-white
          px-7
          py-3
          rounded-2xl
          font-bold
          hover:scale-105
          transition-all
          duration-300
        "
      >
        Ordenar Ahora
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export default HeroCliente;