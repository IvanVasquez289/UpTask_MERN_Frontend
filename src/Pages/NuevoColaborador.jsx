import FormularioColaborador from "../Components/FormularioColaborador"
import Alerta from "../Components/Alerta"
import useProyectos from "../hooks/useProyectos"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
const NuevoColaborador = () => {
  const {id} = useParams();
  const {obtenerProyecto,proyecto,cargando,colaborador,agregarColaborador,setColaborador,alerta} = useProyectos();

  useEffect(() => {
    setColaborador({})
    obtenerProyecto(id)
  }, [])
  
  if(!proyecto._id) return <Alerta alerta={alerta}/>
  return (
    <>
        <h1 className='font-black text-4xl'>Agregar colaborador(a) al proyecto: {proyecto.nombre}</h1>

        <div className='flex justify-center mt-5 mb-5'>
            <FormularioColaborador/>
        </div>

        {cargando ? <p className=" text-center font-bold text-gray-700">Cargando...</p> : colaborador?._id && (
          <div className="bg-white mx-auto w-full xl:w-3/5 shadow-md p-5 rounded">
            <h2 className=" font-bold text-center text-2xl">Resultado:</h2>
            <div className="flex justify-around items-center mt-5">
              <p className="text-xl">{colaborador.nombre}</p>
              <button
                className="bg-slate-700  px-3 py-2 text-md rounded text-white font-bold hover:bg-slate-500"
                onClick={() => agregarColaborador({
                  email: colaborador.email
                })}
              >
                Agregar Colaborador
              </button>
            </div>
          </div>
        )}
    </>
  )
}

export default NuevoColaborador