import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
const Proyecto = () => {
  const {id} = useParams()
  const {obtenerProyecto, proyecto, cargando} = useProyectos()

  useEffect(() => {
    obtenerProyecto(id)
  }, [])
  
  const {nombre} = proyecto;
  return (
    cargando ? '...cargando' : (
      <div>
        <h1 className=" font-black text-4xl">{nombre}</h1>
      </div>
    )
  )
}

export default Proyecto