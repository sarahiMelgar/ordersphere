import HeaderCliente from "../components/client/HeaderCliente";
import HeroCliente from "../components/client/HeroCliente";
import CategoriasCliente from "../components/client/CategoriasCliente";
import ProductoCard from "../components/client/ProductoCard";
import BottomNav from "../components/client/BottomNav";

function Menu() {

  const productos = [

    {
      nombre: "Hamburguesa Doble",
      precio: 180,
      imagen:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },

    {
      nombre: "Pizza Suprema",
      precio: 220,
      imagen:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    },

    {
      nombre: "Tacos al Pastor",
      precio: 140,
      imagen:
        "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85"
    }

  ];

  return (

<div className="min-h-screen bg-linear-to-br from-slate-100 via-orange-50 to-red-50 pb-28">
      <HeaderCliente />

      <div className="p-8 space-y-8">

        <HeroCliente />

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Categorías
          </h2>

          <CategoriasCliente />

        </div>

        <div>

          <h2 className="text-2xl font-bold mb-4">
            Productos Populares
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {productos.map((producto, index) => (

              <ProductoCard
                key={index}
                nombre={producto.nombre}
                precio={producto.precio}
                imagen={producto.imagen}
              />

            ))}

          </div>

        </div>

      </div>

      <BottomNav />

    </div>

  );

}

export default Menu;