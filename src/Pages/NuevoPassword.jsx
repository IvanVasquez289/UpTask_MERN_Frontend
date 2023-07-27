const NuevoPassword = () => {
  return (
    <>
      <h1 className=" text-sky-600 font-black text-6xl capitalize mt-10">
        Reestablece tu password y accede a tus {" "}
        <span className=" text-gray-700">proyectos</span>
      </h1>
      <form className=" bg-white p-10 shadow rounded-lg my-10">
        <div className="mb-7">
          <label
            htmlFor="password"
            className=" text-gray-700 text-xl font-bold uppercase"
          >
            Nuevo password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Escribe tu nuevo password"
            className="w-full mt-3 bg-gray-100 p-4 rounded-xl border"
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="w-full bg-sky-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NuevoPassword;
