import { useEffect } from "react"
import { useParams,Link } from "react-router-dom"
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
      <div className="md:flex justify-between">
        <h1 className=" font-black text-4xl">{nombre}</h1>
        <div className="flex items-center gap-1 text-gray-400 hover:text-black hover:cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>

          <Link to={`/proyectos/editar/${id}`} className=" uppercase font-bold">Editar</Link>
        </div>
      </div>
    )
  )
}

export default Proyecto