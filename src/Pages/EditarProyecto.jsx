import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Formulario from "../Components/Formulario"
const EditarProyecto = () => {
  const {id} = useParams()
  const {obtenerProyecto, proyecto, cargando} = useProyectos()

  useEffect(() => {
    obtenerProyecto(id)
  }, [])

  const {nombre} = proyecto;

  if(cargando) return 'Cargando...'
  return (
    <>
        <h1 className=" font-black text-4xl">Editar Proyecto: {nombre}</h1>
        <div className='mt-5'>
            <Formulario/>
        </div>
    </>
  )
}

export default EditarProyecto