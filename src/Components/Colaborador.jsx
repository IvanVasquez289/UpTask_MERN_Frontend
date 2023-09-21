import useProyectos from "../hooks/useProyectos";
const Colaborador = ({ colaborador }) => {
  const {handleModalEliminarColaborador } = useProyectos()
  const { nombre, email } = colaborador;

  return (
    <div className=" border-b p-5 lg:flex justify-between items-center ">
      <div>
        <p>{nombre}</p>
        <p className=" text-sm text-gray-700 italic">{email}</p>
      </div>
      <div>
        <button 
            type="button"
            className="bg-red-600 text-white p-1 flex-grow  md:px-4 py-3 uppercase text-sm md:text-md font-bold rounded-md hover:bg-red-400"
            onClick={() => handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Colaborador;
