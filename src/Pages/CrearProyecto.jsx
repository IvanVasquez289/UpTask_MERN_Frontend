import React from 'react'
import { useEffect } from "react"
import Formulario from '../Components/Formulario'
import useProyectos from '../hooks/useProyectos'
const CrearProyecto = () => {
  const {setProyecto} = useProyectos()
  useEffect(() => {
    setProyecto({})
  }, [])
  
  return (
    <>
      <h1 className="font-black text-4xl">Crear Proyecto</h1> 
      <div className='mt-5'>
        <Formulario/>
      </div>
    </>
  )
}

export default CrearProyecto