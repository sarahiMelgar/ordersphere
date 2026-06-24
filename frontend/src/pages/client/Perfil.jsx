import BottomNav from "../../components/client/BottomNav";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


function PerfilCliente() {

  const navigate = useNavigate();


  const cerrarSesion = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");

  };


  return (

    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pb-28">


      {/* Encabezado */}
      <div
        className="
          bg-linear-to-r
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
          👤 Mi Perfil
        </h2>

        <p className="mt-3 text-orange-100 text-lg">
          Administra tu información personal y preferencias.
        </p>

      </div>



      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">



        {/* Información usuario */}
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


          <h3
            className="
              text-2xl
              font-bold
              text-slate-800
              dark:text-white
              mb-6
            "
          >
            👤 Información Personal
          </h3>



          {/* Foto */}
          <div className="flex items-center gap-5 mb-8">


            <div
              className="
                w-24
                h-24
                rounded-full
                bg-orange-500
                flex
                items-center
                justify-center
                text-5xl
                border-4
                border-orange-200
              "
            >
              👨
            </div>



            <div>

              <h4 className="text-xl font-bold">
                Juan Pérez
              </h4>

              <p className="text-slate-500">
                Cliente frecuente ⭐
              </p>



              <button
                className="
                  mt-3
                  bg-orange-500
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  hover:bg-orange-600
                "
              >
                Cambiar foto
              </button>


            </div>


          </div>





          {/* Datos */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


            <div>

              <label className="text-sm text-slate-500">
                Nombre
              </label>

              <input
                value="Juan Pérez"
                readOnly
                className="
                  w-full
                  mt-1
                  border
                  rounded-xl
                  p-3
                "
              />

            </div>



            <div>

              <label className="text-sm text-slate-500">
                Correo
              </label>

              <input
                value="juan@email.com"
                readOnly
                className="
                  w-full
                  mt-1
                  border
                  rounded-xl
                  p-3
                "
              />

            </div>



            <div>

              <label className="text-sm text-slate-500">
                Teléfono
              </label>

              <input
                value="555-123-4567"
                readOnly
                className="
                  w-full
                  mt-1
                  border
                  rounded-xl
                  p-3
                "
              />

            </div>



            <div>

              <label className="text-sm text-slate-500">
                Dirección
              </label>

              <input
                value="Av. Principal #123"
                readOnly
                className="
                  w-full
                  mt-1
                  border
                  rounded-xl
                  p-3
                "
              />

            </div>



          </div>





          <button
            className="
              mt-6
              bg-orange-500
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:bg-orange-600
            "
          >
            Guardar Cambios
          </button>



        </div>








        {/* Actividad */}

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



          <h3
            className="
              text-2xl
              font-bold
              dark:text-white
              mb-6
            "
          >
            ⭐ Mi Actividad
          </h3>




          <div className="space-y-5">



            <div className="border-b pb-4">

              <p className="font-semibold">
                Pedidos realizados
              </p>

              <p className="text-orange-500 text-2xl font-bold">
                24
              </p>

            </div>





            <div className="border-b pb-4">

              <p className="font-semibold">
                Total gastado
              </p>

              <p className="text-orange-500 text-2xl font-bold">
                $4,850
              </p>

            </div>





            <div className="border-b pb-4">

              <p className="font-semibold">
                Puntos acumulados
              </p>

              <p className="text-orange-500 text-2xl font-bold">
                320 ⭐
              </p>

            </div>





            {/* Cerrar sesión */}

            <button
              onClick={cerrarSesion}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                bg-red-500
                text-white
                py-3
                rounded-xl
                hover:bg-red-600
                transition-all
                duration-300
                shadow-lg
              "
            >

              <LogOut size={22}/>

              Cerrar Sesión

            </button>



          </div>


        </div>



      </div>




      <BottomNav />


    </div>

  );

}


export default PerfilCliente;