function ProductoCard({
  nombre,
  precio,
  imagen
}) {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        hover:scale-105
        transition-all
        duration-300
      "
    >

      <img
        src={imagen}
        alt={nombre}
        className="
          h-56
          w-full
          object-cover
        "
      />

      <div className="p-5">

        <h3 className="font-bold text-2xl">
          {nombre}
        </h3>

        <p className="text-slate-500 mt-2">
          Delicioso producto preparado al momento.
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-2xl font-black text-orange-500">
            ${precio}
          </span>

          <button
            className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-5
              py-3
              rounded-xl
              font-semibold
            "
          >
            Agregar
          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductoCard;