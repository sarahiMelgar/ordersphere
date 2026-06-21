function HeroCliente() {
  return (

    <div
      className="
        relative
        overflow-hidden
        bg-gradient-to-r
        from-orange-500
        via-red-500
        to-orange-600
        rounded-3xl
        p-10
        text-white
        shadow-2xl
      "
    >

      <div className="absolute right-0 top-0 text-[180px] opacity-10">
        🍔
      </div>

      <h2 className="text-5xl font-black">
        🔥 20% OFF
      </h2>

      <p className="mt-4 text-xl">
        En todas las hamburguesas premium
      </p>

      <button
        className="
          mt-6
          bg-white
          text-orange-500
          px-6
          py-3
          rounded-xl
          font-bold
          hover:scale-105
          transition
        "
      >
        Ordenar Ahora
      </button>

    </div>

  );
}

export default HeroCliente;