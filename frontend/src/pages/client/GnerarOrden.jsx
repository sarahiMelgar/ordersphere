import { useState } from "react";

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  MapPin,
  Home,
  Building2,
  CreditCard,
  FileText
} from "lucide-react";

import {
  db,
  auth
} from "../../firebase/firebase";

function GenerarOrden() {

  const navigate = useNavigate();

  const location = useLocation();

  const { idCarrito } =
    location.state;

  const [form,setForm] =
    useState({
      calle:"",
      municipio:"",
      estado:"",
      numeroExterior:"",
      numeroInterior:"",
      referencias:"",
      pago:""
    });

  const handleChange = e => {

    setForm({
      ...form,
      [e.target.name]:
      e.target.value
    });

  };

  const guardarPedido =
    async e => {

      e.preventDefault();

      await addDoc(
        collection(
          db,
          "pedidos"
        ),
        {

          direccion:{
            calle:
              form.calle,

            municio:
              form.municipio,

            estado:
              form.estado,

            "numero exterior":
              form.numeroExterior,

            "numero interior":
              form.numeroInterior,

            referencias:
              form.referencias
          },

          estado:
            "proceso",

          fechadecreacion:
            serverTimestamp(),

          id_carrito:
            idCarrito,

          id_cliente:
            auth.currentUser.uid,

          pago:
            form.pago,

          total:0,

          productos:""
        }
      );

      navigate(
        "/pedidoscliente"
      );
  };

  return (

    <div className="
      max-w-2xl
      mx-auto
      p-6
    ">

      <h1 className="
        text-3xl
        font-bold
        mb-8
      ">
        Finalizar pedido
      </h1>

      <form
        onSubmit={guardarPedido}
        className="space-y-4"
      >

        <Input
          icon={<Home size={18}/>}
          name="calle"
          placeholder="Calle"
          onChange={handleChange}
        />

        <Input
          icon={<Building2 size={18}/>}
          name="numeroExterior"
          placeholder="Número exterior"
          onChange={handleChange}
        />

        <Input
          icon={<Building2 size={18}/>}
          name="numeroInterior"
          placeholder="Número interior"
          onChange={handleChange}
        />

        <Input
          icon={<MapPin size={18}/>}
          name="municipio"
          placeholder="Municipio"
          onChange={handleChange}
        />

        <Input
          icon={<MapPin size={18}/>}
          name="estado"
          placeholder="Estado"
          onChange={handleChange}
        />

        <Input
          icon={<FileText size={18}/>}
          name="referencias"
          placeholder="Referencias"
          onChange={handleChange}
        />

        <div className="
          flex
          items-center
          gap-3
          border
          rounded-xl
          p-4
        ">
          <CreditCard size={18}/>

          <select
            name="pago"
            onChange={handleChange}
            className="
              w-full
              outline-none
            "
          >
            <option value="">
              Selecciona método de pago
            </option>

            <option value="Efectivo">
              Efectivo
            </option>

            <option value="Tarjeta">
              Tarjeta
            </option>

            <option value="Transferencia">
              Transferencia
            </option>

          </select>
        </div>

        <button
          className="
            w-full
            bg-orange-500
            hover:bg-orange-600
            text-white
            py-4
            rounded-xl
            font-bold
          "
        >
          Confirmar pedido
        </button>

      </form>

    </div>
  );
}

function Input({
  icon,
  ...props
}) {

  return (
    <div className="
      flex
      items-center
      gap-3
      border
      rounded-xl
      p-4
    ">
      {icon}

      <input
        className="
          w-full
          outline-none
        "
        {...props}
      />
    </div>
  );
}

export default GenerarOrden;