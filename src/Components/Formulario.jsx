import { useState } from "react"
const Formulario = () => {
  const [nombre,setNombre] = useState('')
  const [descripcion,setDescripcion] = useState('')
  const [fechaEntrega,setFechaEntrega] = useState('')
  const [cliente,setCliente] = useState('')

  return (
    <form className=' bg-white w-1/2 rounded shadow p-4'>
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
  )
}

export default Formulario