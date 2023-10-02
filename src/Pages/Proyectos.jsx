import { useEffect } from "react";
import ProyectoPreview from "../Components/ProyectoPreview";
import useProyectos from "../hooks/useProyectos";
import Alerta from "../Components/Alerta";


const Proyectos = () => {
  const { proyectos, alerta } = useProyectos();
  
  const {msj} = alerta;
  return (
    <>
      <h1 className="font-black text-4xl">Proyectos</h1>
      {msj && <Alerta alerta={alerta}/>}
      <div className=" bg-white shadow-md  rounded-lg mt-10">
        {proyectos?.length ? (
          proyectos.map(proyecto => (
            <ProyectoPreview key={proyecto._id} proyecto={proyecto}/>
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            No hay proyectos aún
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
