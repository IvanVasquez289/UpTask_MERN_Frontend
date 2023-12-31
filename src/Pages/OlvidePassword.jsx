import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../Components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email.trim() === "" || email.length < 6){
      setAlerta({
        msj: 'El email es obligatorio',
        error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`,{email})
      setAlerta({
        msj: data.msj,
        error: false
      })
    } catch (error) {
      setAlerta({
        msj: error.response.data.msj,
        error: true
      })
    }
  }

  const {msj} = alerta;
  return (
    <>
      <h1 className=" text-sky-600 font-black text-6xl capitalize mt-10">
        Inicia sesión y administra tus {""}
        <span className=" text-gray-700">proyectos</span>
      </h1>
      {msj && <Alerta alerta={alerta}/>}
      <form onSubmit={handleSubmit} className=" bg-white p-10 shadow rounded-lg my-10">
        <div className="mb-7">
          <label
            htmlFor="email"
            className=" text-gray-700 text-xl font-bold uppercase"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 bg-gray-100 p-4 rounded-xl border"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
       
        <input
          type="submit"
          value="Enviar Instrucciones"
          className="w-full bg-sky-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className=" xl:flex xl:justify-between">
        <Link
          to={"/registrar"}
          className="text-slate-500 uppercase block text-center text-sm my-3"
        >
          No tienes cuenta? Registrate
        </Link>
        <Link
          to={"/"}
          className="text-slate-500 uppercase block text-center text-sm my-3"
        >
          Ya tienes una cuenta? Inicia Sesión
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
