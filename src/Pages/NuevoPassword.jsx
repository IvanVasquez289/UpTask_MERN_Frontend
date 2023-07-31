import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../Components/Alerta";

const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({})
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordModificado,setPasswordModificado] = useState(false)
  const {token} = useParams()
 
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`)
        setIsTokenValid(true)
      } catch (error) {
        setAlerta({
          msj: error.response.data.msj,
          error: true
        })
        setIsTokenValid(false)
      }
      
    }

    comprobarToken()
  }, [])

  const handleSubmit = async  e => {
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msj: 'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return
    }

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`,{password})
      setAlerta({
        msj: data.msj,
        error: false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msj: error.response.data.msj,
        error:true
      })
      setPasswordModificado(false)
    }

  }

  const {msj} = alerta
  
  return (
    <>
      <h1 className=" text-sky-600 font-black text-6xl capitalize mt-10">
        Reestablece tu password y accede a tus {" "}
        <span className=" text-gray-700">proyectos</span>
      </h1>
      {msj && <Alerta alerta={alerta}/>}
      {isTokenValid && (
        <form onSubmit={handleSubmit} className=" bg-white p-10 shadow rounded-lg my-10">
          <div className="mb-7">
            <label
              htmlFor="password"
              className=" text-gray-700 text-xl font-bold uppercase"
            >
              Nuevo password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Escribe tu nuevo password"
              className="w-full mt-3 bg-gray-100 p-4 rounded-xl border"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar nuevo password"
            disabled= {passwordModificado}
            className={`
              ${passwordModificado ? "hover:cursor-not-allowed bg-sky-300" : "hover:cursor-pointer hover:bg-sky-800 transition-colors"} 
              w-full bg-sky-700 py-3 rounded-xl text-white font-bold uppercase  
            `}
          />
        </form>
      )}

      {passwordModificado && (
        <Link
          to={"/"}
          className="text-slate-500 uppercase block text-center text-sm my-3"
        >
          Ya tienes una cuenta? Inicia Sesión
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
