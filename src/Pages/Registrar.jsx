import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../Components/Alerta";
import axios from "axios"
const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPasssword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if(nombre.trim() == "" || email.trim() == "" || password.trim() == "" || repetirPasssword.trim() == ""){
      setAlerta({
        msj: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPasssword){
      setAlerta({
        msj: 'Los Password no son iguales',
        error: true
      })
      return
    }

    if(password.length < 6){
      setAlerta({
        msj: 'El Password es muy corto, agrega minimo 6 caracteres',
        error: true
      })
      return
    }

    //Si pasa todas las validaciones dejamos el alerta en un obj vacio para que no se muestre el componente
    setAlerta({})
    // Crear el usuario en la API
   try {
     const resultado = await axios.post('http://localhost:4000/api/usuarios',{nombre,email,password})
     console.log(resultado)
   } catch (error) {
    console.log(error)
   }

  }

  const {msj} = alerta;
  return (
    <>
      <h1 className=" text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus {""}
        <span className=" text-gray-700">proyectos</span>
      </h1>
      {msj && <Alerta alerta={alerta}/>}
      <form 
        onSubmit={handleSubmit} 
        className=" bg-white p-7 shadow rounded-lg my-10"
      >
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className=" text-gray-700 text-lg font-bold uppercase"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Tu nombre"
            className="w-full mt-3 bg-gray-100 p-2 rounded-xl border"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className=" text-gray-700 text-lg font-bold uppercase"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 bg-gray-100 p-2 rounded-xl border"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className=" text-gray-700 text-lg font-bold uppercase"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password de registro"
            className="w-full mt-3 bg-gray-100 p-2 rounded-xl border"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className=" text-gray-700 text-lg font-bold uppercase"
          >
            Repetir Password
          </label>
          <input
            type="password"
            id="password2"
            placeholder="Password de registro"
            className="w-full mt-3 bg-gray-100 p-2 rounded-xl border mb-2"
            value={repetirPasssword}
            onChange={e => setRepetirPassword(e.target.value)}
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
          to={"/"}
          className="text-slate-500 uppercase block text-center text-sm my-3"
        >
          Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          to={"/olvide-password"}
          className="text-slate-500 uppercase block text-center text-sm my-3"
        >
          Olvide mi contraseña
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
