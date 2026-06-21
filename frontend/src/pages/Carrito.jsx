import BottomNav from "../components/client/BottomNav";

function CarritoCliente() {

  const productos = [
    {
      id: 1,
      nombre: "🍔 Hamburguesa Especial",
      descripcion: "Carne, queso y papas",
      cantidad: 2,
      precio: 120
    },
    {
      id: 2,
      nombre: "🍟 Combo Familiar",
      descripcion: "Hamburguesa + papas",
      cantidad: 1,
      precio: 250
    },
    {
      id: 3,
      nombre: "🥤 Refresco",
      descripcion: "Bebida fría",
      cantidad: 2,
      precio: 35
    }
  ];


  return (

    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pb-28">


      {/* Encabezado */}
      <div
        className="
          bg-gradient-to-r
          from-orange-500
          to-orange-600
          rounded-3xl
          p-8
          text-white
          shadow-lg
          mb-8
        "
      >

        <h2 className="text-4xl font-bold">
          🛒 Mi Carrito
        </h2>

        <p className="mt-3 text-orange-100 text-lg">
          Revisa tus productos antes de realizar el pedido.
        </p>

      </div>



      {/* Contenido */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">



        {/* Productos */}
        <div
          className="
            xl:col-span-2
            bg-white
            dark:bg-slate-800
            rounded-3xl
            p-6
            shadow-sm
          "
        >


          <h3 className="
            text-2xl
            font-bold
            text-slate-800
            dark:text-white
            mb-6
          ">
            📦 Productos
          </h3>



          <div className="space-y-5">


            {productos.map((producto)=>(


              <div
                key={producto.id}
                className="
                  border
                  rounded-2xl
                  p-5
                  hover:shadow-md
                  transition
                  flex
                  justify-between
                  items-center
                "
              >


                <div>

                  <h4 className="font-bold text-lg">
                    {producto.nombre}
                  </h4>

                  <p className="text-slate-500">
                    {producto.descripcion}
                  </p>


                  <p className="text-orange-500 font-bold mt-2">
                    ${producto.precio}
                  </p>


                </div>



                <div className="text-right">


                  <div className="
                    flex
                    items-center
                    gap-3
                    mb-3
                  ">

                    <button
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-slate-200
                      "
                    >
                      -
                    </button>


                    <span className="font-bold">
                      {producto.cantidad}
                    </span>


                    <button
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-orange-500
                        text-white
                      "
                    >
                      +
                    </button>

                  </div>



                  <button
                    className="
                      text-red-500
                      text-sm
                    "
                  >
                    Eliminar
                  </button>


                </div>



              </div>


            ))}


          </div>


        </div>






        {/* Resumen */}
        <div
          className="
            bg-white
            dark:bg-slate-800
            rounded-3xl
            p-6
            shadow-sm
            h-fit
          "
        >


          <h3 className="
            text-2xl
            font-bold
            text-slate-800
            dark:text-white
            mb-6
          ">
            🧾 Resumen
          </h3>



          <div className="space-y-4">


            <div className="flex justify-between">
              <span>
                Subtotal
              </span>

              <span>
                $540
              </span>
            </div>



            <div className="flex justify-between">
              <span>
                Envío
              </span>

              <span>
                $30
              </span>
            </div>


            <hr />


            <div className="
              flex
              justify-between
              text-xl
              font-bold
            ">

              <span>
                Total
              </span>

              <span className="text-orange-500">
                $570
              </span>

            </div>



            <button
              className="
                w-full
                bg-orange-500
                text-white
                py-4
                rounded-2xl
                font-bold
                hover:bg-orange-600
                transition
              "
            >
              Confirmar Pedido
            </button>



          </div>


        </div>


      </div>



      <BottomNav />


    </div>

  );
}


export default CarritoCliente;