const Alerta = ({ alerta }) => {
  return (
    <div
      className={` ${
        alerta.error ? " from-red-400 to-red-600" : " from-sky-400 to-sky-600"
      }  bg-gradient-to-br text-white p-3 font-sm text-center rounded-xl my-10 uppercase font-bold`}
    >
      {alerta.msj}
    </div>
  );
};

export default Alerta;
