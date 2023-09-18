import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="px-4 py-5 bg-gray-800 border-b">
        <div className="flex flex-col items-center gap-4 md:flex-row  md:justify-between ">
            <Link to={'/proyectos'} className="text-4xl text-sky-600 font-black text-center">
                UpTask
            </Link>
            {/* <h2 className="text-4xl text-sky-600 font-black text-center">UpTask</h2> */}
            <input 
                type="search"
                className="border p-2 rounded w-96"
                placeholder="Buscar Proyecto"               
            />

            <div className="flex items-center gap-5">
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