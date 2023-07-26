import React from "react";

const Login = () => {
  return (
    <>
      <h1 className=" text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus {""}
        <span className=" text-gray-700">proyectos</span>
      </h1>
      <form className=" bg-white p-10 shadow rounded-lg my-10">
          <div className="mb-5">
              <label
                htmlFor="email"
                className=" text-gray-700 text-xl font-bold uppercase"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email de registro"
                className="w-full mt-3 bg-gray-100 p-4 rounded-xl border"
              />
          </div>
          <div className="my-5">
              <label
                htmlFor="password"
                className=" text-gray-700 text-xl font-bold uppercase"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password de registro"
                className="w-full mt-3 bg-gray-100 p-4 rounded-xl border"
              />
          </div>

          <input 
            type="submit" 
            value="Iniciar Sesion" 
            className="w-full bg-sky-700 py-3 rounded-xl text-white font-bold uppercase cursor-pointer hover:bg-sky-800 transition-colors"
          />
      </form>
    </>
  );
};

export default Login;
