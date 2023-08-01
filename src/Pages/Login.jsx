import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../Components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if(email.trim() == "" || password.trim() == "" ){
      setAlerta({
        msj: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post('/usuarios/login',{email,password})
      localStorage.setItem('token',data.token)
      setAlerta({})
      setAuth(data)
      navigate('/proyectos')
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
      <h1 className=" text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus {""}
        <span className=" text-gray-700">proyectos</span>
      </h1>
      
      {msj && <Alerta alerta={alerta}/>}
      <form onSubmit={handleSubmit} className=" bg-white p-10 shadow rounded-lg my-10">
          <div className="mb-5">
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
                onChange={e => setEmail(e.target.value)}
              />
          </div>
          <div className="my-5">
              <label
                htmlFor="password"
                className=" text-gray-700 text-xl font-bold uppercase"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password de registro"
                className="w-full mt-3 bg-gray-100 p-4 rounded-xl border"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
          </div>

          <input 
            type="submit" 
            value="Iniciar Sesion" 
            className="w-full bg-sky-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-sky-800 transition-colors"
          />
      </form>

      <nav className=" lg:flex lg:justify-between">
        <Link 
          to={'/registrar'} 
          className="text-slate-500 uppercase block text-center text-sm my-3"
          >
            No tienes cuenta? Registrate
          </Link>
        <Link 
          to={'/olvide-password'} 
          className="text-slate-500 uppercase block text-center text-sm my-3"
        >
          Olvide mi contraseña
        </Link>
        
      </nav>
    </>
  );
};

export default Login;
