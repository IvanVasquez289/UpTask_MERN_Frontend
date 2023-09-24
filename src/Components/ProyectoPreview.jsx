import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const ProyectoPreview = ({ proyecto }) => {
  const {auth} = useAuth()
  const { nombre, _id, cliente ,creador} = proyecto;

  return (
    <div className=" p-5 border-b flex items-center justify-between">
      <div className="flex-col md:flex md:flex-row items-center gap-2">
        <p>
          {nombre}
        </p>

        <p className="text-gray-500 uppercase text-sm italic">{cliente}</p>{" "}

        {auth._id !== creador && (
          <p className="bg-green-400 p-1 rounded text-white text-sm font-bold">
            Colaborador
          </p>
        )}
      </div>

      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase font-bold text-sm"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default ProyectoPreview;
