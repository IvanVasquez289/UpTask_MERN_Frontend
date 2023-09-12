import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
const FormularioColaborador = () => {
  const {setAlerta,alerta,submitColaborador} = useProyectos()

  const [email,setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email.trim() === ''){
        setAlerta({
            msj: 'El email es obligatorio',
            error: true
        })
        return
    }

    submitColaborador(email)
  }

  const {msj} = alerta;
  return (
    <div className="mx-auto w-full xl:w-3/5">
      {msj && <Alerta alerta={alerta}/>}
      <form className="bg-white  rounded shadow p-4" onSubmit={handleSubmit}>
        <div className='mb-3'>
            <label 
                htmlFor="email"
                className='uppercase font-bold'
            >
                Email
            </label>
            <input 
                type="email" 
                id="email" 
                placeholder='Email del usuario'
                className='w-full border-2 rounded p-2 mt-2' 
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <input 
            type="submit" 
            value='Buscar Colaborador'
            className='w-full bg-sky-600 hover:bg-sky-700 transition-colors p-2 rounded-md text-white text-md cursor-pointer'
        />
      </form>
    </div>
  );
};

export default FormularioColaborador;
