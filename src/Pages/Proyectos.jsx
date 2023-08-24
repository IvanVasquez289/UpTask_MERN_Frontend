import ProyectoPreview from "../Components/ProyectoPreview";
import useProyectos from "../hooks/useProyectos";
const Proyectos = () => {
  const { proyectos } = useProyectos();
  console.log(proyectos);
  return (
    <>
      <h1 className="font-black text-4xl">Proyectos</h1>
      <div className=" bg-white shadow-md  rounded-lg mt-10">
        {proyectos.length ? (
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
