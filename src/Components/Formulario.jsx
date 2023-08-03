import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"
const Formulario = () => {

  const {alerta,handleAlerta, submitProyecto} = useProyectos()

  const [nombre,setNombre] = useState('')
  const [descripcion,setDescripcion] = useState('')
  const [fechaEntrega,setFechaEntrega] = useState('')
  const [cliente,setCliente] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    if([nombre,descripcion,fechaEntrega,cliente].includes('')){
        handleAlerta({
            msj: 'Todos los campos son obligatorios',
            error: true
        })
        return
    }
    
    // Pasar los datos al provider
    await submitProyecto({nombre,descripcion,fechaEntrega,cliente})

    // Limpiar formulario al crearse el proyecto
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')
  } 

  const {msj} = alerta;
  return (
    <div className="mx-auto w-3/4">
        {msj && <Alerta alerta={alerta}/>}
        <form onSubmit={handleSubmit} className=' bg-white  rounded shadow p-4'>
            <div className='my-3'>
                <label htmlFor="nombre" className='uppercase font-bold text-sm text-gray-600'>Nombre Proyecto</label>
                <input 
                    type="text" 
                    id="nombre"
                    className='w-full border p-3  rounded placeholder-gray-400 my-2'
                    placeholder='Nombre del proyecto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className='my-3'>
                <label htmlFor="descripcion" className='uppercase font-bold text-sm text-gray-600'>Descripcion</label>
                <textarea 
                    id="descripcion"
                    className='w-full border p-3  rounded placeholder-gray-400 max-h-16 my-2'
                    placeholder='Descripcion del proyecto'
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>
            <div className='my-3'>
                <label htmlFor="fecha-entrega" className='uppercase font-bold text-sm text-gray-600'>Fecha Entrega</label>
                <input 
                    type='date'
                    id="fecha-entrega"
                    className='w-full border p-3 rounded placeholder-gray-400 my-2'
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>
            <div className='my-3'>
                <label htmlFor="cliente" className='uppercase font-bold text-sm text-gray-600'>Nombre Cliente</label>
                <input 
                    type="text" 
                    id="cliente"
                    className='w-full border p-3 rounded placeholder-gray-400 my-2'
                    placeholder='Nombre del cliente'
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Crear Proyecto" 
                className="bg-sky-600 w-full font-bold text-white uppercase p-3 rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    </div>
  )
}

export default Formulario