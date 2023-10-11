import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAuth from "../hooks/useAuth"
import Busqueda from "./Busqueda"
const Header = () => {
  const {handleBuscador,cerrarSesionProyectos} = useProyectos()
  const {cerrarSesionAuth} = useAuth()

  const handleCerrarSesion = () => {
    cerrarSesionProyectos()
    cerrarSesionAuth()
    localStorage.removeItem('token')
  }
  return (
    <header className="px-4 py-5 bg-gray-800 border-b">
        <div className="flex flex-col items-center gap-4 md:flex-row  md:justify-between ">
            <Link to={'/proyectos'} className="text-4xl text-sky-600 font-black text-center">
                UpTask
            </Link>

            <div className="flex flex-col md:flex-row items-center gap-5">
                <button 
                    type="button" 
                    className="font-bold flex gap-2 uppercase text-gray-400 hover:text-gray-100"
                    onClick={handleBuscador}
                >
                    Buscar Proyecto
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </button>
                <Link to={'/proyectos'} className="font-bold uppercase text-gray-400 hover:text-gray-100">
                    Proyectos
                </Link>
                <button 
                    type="button" 
                    className="bg-sky-600 text-white rounded-md p-2 uppercase font-bold"
                    onClick={handleCerrarSesion}
                >
                    Cerrar Sesion
                </button>
            </div>
        </div>
        <Busqueda/>
    </header>
  )
}

export default Header