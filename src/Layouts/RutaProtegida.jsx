import { Outlet , Navigate} from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../Components/Header"
import Sidebar from "../Components/Sidebar"
const RutaProtegida = () => {
  const {auth,cargando} = useAuth()
  // console.log(auth)

  if(cargando){
    return (
      "Cargando"
    )
  }

  return (
    <>
        {auth._id ? (
          <div className="bg-gray-200">
              <Header/>
              <div className=" md:flex min-h-screen">
                  <Sidebar/>
                  <main className="flex-1 px-5 pb-10 md:my-10">
                      <Outlet/>
                  </main>
              </div>
          </div>
        ) : <Navigate to={'/'}/>}   
    </>
  )
}

export default RutaProtegida