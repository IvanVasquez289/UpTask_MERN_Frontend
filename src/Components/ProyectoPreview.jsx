import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const ProyectoPreview = ({ proyecto }) => {
  const {auth} = useAuth()
  const { nombre, _id, cliente ,creador} = proyecto;

  return (
    <div className=" p-5 border-b flex flex-col md:flex-row justify-between">
      <div className="flex flex-col items-start gap-2 mb-2 md:mb-0">
        <p>
          {nombre}
        </p>

        <p className="text-gray-500 uppercase text-sm italic w-full overflow-hidden">{cliente}</p>{" "}

        {auth._id !== creador && (
          <p className="bg-green-400 p-1 rounded text-white text-sm font-bold">
            Colaborador
          </p>
        )}
      </div>

      <Link
        to={`${_id}`}
        className="text-sky-600 hover:text-sky-800 uppercase font-bold text-sm"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default ProyectoPreview;
