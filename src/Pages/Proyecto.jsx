import { useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom"
// ? Hooks
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
// ? Componentes
import Tarea from "../Components/Tarea"
import Alerta from "../Components/Alerta"
import Colaborador from "../Components/Colaborador"
// ? Modales
import ModalFormularioTarea from "../Components/ModalFormularioTarea"
import ModalEliminarTarea from "../Components/ModalEliminarTarea"
import ModalEliminarColaborador from "../Components/ModalEliminarColaborador"

const Proyecto = () => {
  const {id} = useParams()
  const {obtenerProyecto, proyecto, cargando,handleClickModal,alerta} = useProyectos()
  const admin = useAdmin()
  useEffect(() => {
    obtenerProyecto(id)
  }, [])
  
  const {nombre} = proyecto;
  // console.log(proyecto)
  if(cargando) return 'Cargando...'

  const {msj} = alerta;
  console.log(admin)
  return (
    msj && alerta.error ? <Alerta alerta={alerta}/> : (
      <>
        <div className="md:flex justify-between">
          <h1 className=" font-black text-4xl mb-3">{nombre}</h1>
          {admin && (
            <div className="flex items-center gap-1 text-gray-400 hover:text-black hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>

              <Link to={`/proyectos/editar/${id}`} className=" uppercase font-bold my-4">Editar</Link>
            </div>
          )}
        </div>

        {admin && (
          <button className=" bg-sky-400  md:w-auto text-white px-5 py-3 
            rounded uppercase text-sm font-bold  text-center flex gap-2 items-center
            "
            onClick={handleClickModal}
          >
            Nueva tarea
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        <p className=" font-bold mt-4 text-xl mb-4">Tareas del Proyecto</p>
        {msj && <Alerta alerta={alerta}/>}
        {proyecto.tareas?.length ? (
          <div className=" bg-white rounded ">
            {proyecto.tareas?.map(tarea => (
              <Tarea key={tarea._id} tarea={tarea}/>
            ))}
          </div>
        ) : (
          <div className=" bg-white shador rounded p-4 text-center">
            <p className=" font-medium">No hay tareas</p>
          </div>
        )}

        {admin && (
          <>
            <div className="flex items-center justify-between">
              <p className=" font-bold mt-4 text-xl mb-4">Colaboradores</p>
              <Link 
                to={`/proyectos/nuevo-colaborador/${proyecto._id}`} 
                className=" text-gray-400 hover:text-black uppercase font-bold"
              >
                  Agregar
              </Link>
            </div>

            <div>
              {proyecto.colaboradores?.length ? (
                <div className=" bg-white rounded ">
                  {proyecto.colaboradores?.map(colaborador => (
                    <Colaborador key={colaborador._id} colaborador={colaborador}/>
                  ))}
                </div>
              ) : (
                <div className=" bg-white shador rounded p-4 text-center">
                  <p className=" font-medium">No hay colaboradores en este proyecto</p>
                </div>
              )}
            </div>
          </>
        )}
        <ModalFormularioTarea/>
        <ModalEliminarTarea/>
        <ModalEliminarColaborador/>
      </>

    )
    
  )
}

export default Proyecto