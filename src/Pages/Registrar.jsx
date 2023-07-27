import { Link } from "react-router-dom";
const Registrar = () => {
  return (
    <>
      <h1 className=" text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus {""}
        <span className=" text-gray-700">proyectos</span>
      </h1>
      <form className=" bg-white p-7 shadow rounded-lg my-10">
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className=" text-gray-700 text-lg font-bold uppercase"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Tu nombre"
            className="w-full mt-3 bg-gray-100 p-2 rounded-xl border"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className=" text-gray-700 text-lg font-bold uppercase"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 bg-gray-100 p-2 rounded-xl border"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className=" text-gray-700 text-lg font-bold uppercase"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password de registro"
            className="w-full mt-3 bg-gray-100 p-2 rounded-xl border"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className=" text-gray-700 text-lg font-bold uppercase"
          >
            Repetir Password
          </label>
          <input
            type="password"
            id="password2"
            placeholder="Password de registro"
            className="w-full mt-3 bg-gray-100 p-2 rounded-xl border mb-2"
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesion"
          className="w-full bg-sky-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className=" lg:flex lg:justify-between">
        <Link
          to={"/"}
          className="text-slate-500 uppercase block text-center text-sm my-3"
        >
          Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          to={"/olvide-password"}
          className="text-slate-500 uppercase block text-center text-sm my-3"
        >
          Olvide mi contraseña
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
