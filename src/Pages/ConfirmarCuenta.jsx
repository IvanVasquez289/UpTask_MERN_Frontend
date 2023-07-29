import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../Components/Alerta";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState ({})
  const [isConfirmed, setIsConfirmed] = useState(false)
  const {token} = useParams()

  useEffect(() => {

    const confirmAccount = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${token}`
        const {data} = await axios(url)
        setAlerta({
          msj: data.msj,
          error: false
        })
        setIsConfirmed(true)
      } catch (error) {
        setAlerta({
          msj: error.response.data.msj,
          error: true
        })
        setIsConfirmed(false)
      }
     
    }

    return () => {confirmAccount()}
  }, [])

  const {msj} = alerta;
  return (
    <>
      <h1 className=" text-sky-600 font-black text-6xl capitalize mt-10">
        Confirma tu cuenta y comienza a crear tus{" "}
        <span className=" text-gray-700">proyectos</span>
      </h1>
      <div className=" bg-white shadow-md rounded-lg p-10 my-10">
        {msj && <Alerta alerta={alerta}/>}
        {isConfirmed && (
          <Link
            to={"/"}
            className="text-slate-500 uppercase block text-center text-sm my-3"
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
