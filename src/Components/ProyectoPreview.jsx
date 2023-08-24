import { Link } from "react-router-dom";
const ProyectoPreview = ({ proyecto }) => {
  const { nombre, _id, cliente } = proyecto;
  return (
    <div className=" p-5 border-b flex items-center">
      <p className="flex-1">
        {nombre}{" "}
        <span className="text-gray-500 uppercase text-sm">{cliente}</span>{" "}
      </p>

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
