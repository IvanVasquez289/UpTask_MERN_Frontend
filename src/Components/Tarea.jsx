import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {

  const {handleClickTarea, handleClickEliminarTarea,completarTarea} = useProyectos()
  const admin = useAdmin()
  const { nombre, descripcion, estado, fechaEntrega, prioridad, _id, completado } = tarea;

  return (
    <div className=" border-b p-5 lg:flex justify-between items-center ">
      <div className="flex flex-col items-start">
        <p className=" text-xl">{nombre}</p>
        <p className=" text-gray-500 uppercase text-md">{descripcion}</p>
        <p className="text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600">Prioridad: {prioridad}</p>
        {estado && <p className=" bg-green-500 rounded p-1 text-white">Completado por: {completado?.nombre} </p>}
      </div>
      <div className="flex gap-3 mt-3">
        {admin && (
          <button 
            className="bg-indigo-600 text-white flex-grow px-4 py-3 uppercase text-md font-bold rounded-md"
            onClick={() => handleClickTarea(tarea)}
          >
            Editar
          </button>
        )}

        <button 
          className={`${estado ? 'bg-blue-600' : 'bg-gray-600'} text-white p-1 flex-grow  md:px-4 py-3 uppercase text-sm md:text-md font-bold rounded-md`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? 'Completo' : 'Incompleto'}
        </button>
  
        {admin && (
          <button 
            className="bg-red-600 text-white p-1 flex-grow  md:px-4 py-3 uppercase text-sm md:text-md font-bold rounded-md"
            onClick={() => handleClickEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
