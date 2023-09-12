import FormularioColaborador from "../Components/FormularioColaborador"
const NuevoColaborador = () => {
  return (
    <>
        <h1 className='font-black text-4xl'>Agregar colaborador(a)</h1>

        <div className='flex justify-center mt-5'>
            <FormularioColaborador/>
        </div>
    </>
  )
}

export default NuevoColaborador