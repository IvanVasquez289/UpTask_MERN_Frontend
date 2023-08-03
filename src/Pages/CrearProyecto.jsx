import React from 'react'
import Formulario from '../Components/Formulario'

const CrearProyecto = () => {
  return (
    <>
      <h1 className="font-black text-4xl">Crear Proyecto</h1> 
      <div className='flex justify-center mt-5'>
        <Formulario/>
      </div>
    </>
  )
}

export default CrearProyecto