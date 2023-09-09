import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
const Tarea = ({ tarea }) => {

  const {handleClickTarea} = useProyectos()
  const { nombre, descripcion, estado, fechaEntrega, prioridad, _id } = tarea;

  return (
    <div className=" border-b p-5 lg:flex justify-between items-center ">
      <div>
        <p className=" text-xl">{nombre}</p>
        <p className=" text-gray-500 uppercase text-md">{descripcion}</p>
        <p className="text-xl">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-3 mt-3">
        <button 
          className="bg-indigo-600 text-white flex-grow px-4 py-3 uppercase text-md font-bold rounded-md"
          onClick={() => handleClickTarea(tarea)}
        >
          Editar
        </button>

        {estado ? (
          <button className="bg-blue-600 text-white p-1 flex-grow  md:px-4 py-3 uppercase text-sm md:text-md font-bold rounded-md">
            Completo
          </button>
        ) : (
          <button className="bg-gray-600 text-white p-1 flex-grow  md:px-4 py-3 uppercase text-sm md:text-md font-bold rounded-md">
            Incompleto
          </button>
        )}
        <button className="bg-red-600 text-white p-1 flex-grow  md:px-4 py-3 uppercase text-sm md:text-md font-bold rounded-md">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Tarea;
