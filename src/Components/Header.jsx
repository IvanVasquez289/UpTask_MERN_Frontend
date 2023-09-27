import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="px-4 py-5 bg-gray-800 border-b">
        <div className="flex flex-col items-center gap-4 md:flex-row  md:justify-between ">
            <Link to={'/proyectos'} className="text-4xl text-sky-600 font-black text-center">
                UpTask
            </Link>

            <div className="flex flex-col md:flex-row items-center gap-5">
                <button type="button" className="font-bold uppercase text-gray-400 hover:text-gray-100">Buscar Proyecto</button>
                <Link to={'/proyectos'} className="font-bold uppercase text-gray-400 hover:text-gray-100">
                    Proyectos
                </Link>
                <button type="button" className="bg-sky-600 text-white rounded-md p-2 uppercase font-bold">
                    Cerrar Sesion
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header