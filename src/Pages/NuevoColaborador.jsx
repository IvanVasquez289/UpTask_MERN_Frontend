import FormularioColaborador from "../Components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
const NuevoColaborador = () => {
  const {id} = useParams();
  const {obtenerProyecto,proyecto,cargando} = useProyectos();

  useEffect(() => {
    obtenerProyecto(id)
  }, [])
  
  if(cargando) return 'Cargando...'
  return (
    <>
        <h1 className='font-black text-4xl'>Agregar colaborador(a) al proyecto: {proyecto.nombre}</h1>

        <div className='flex justify-center mt-5'>
            <FormularioColaborador/>
        </div>
    </>
  )
}

export default NuevoColaborador