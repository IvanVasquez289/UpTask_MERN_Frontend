import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate , useLocation} from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth,setAuth] = useState({})
    const [cargando,setCargando] = useState(true)

    const navigate = useNavigate()
    const { pathname } = useLocation();

    useEffect(() => {
        const comprobarToken = async () => {
            const token = localStorage.getItem('token')
            
            if(!token){
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/usuarios/perfil',config)
                setAuth(data)
                
                const rutasPublicas = ["/", "/registrar", "/olvide-password", "/confirmar"];
                if (rutasPublicas.includes(pathname)) {
                  navigate("/proyectos");
                }

            } catch (error) {
                console.log(error.response.data.msj)
                setAuth({})
            }finally{
                setCargando(false)
            }



        }

        comprobarToken()
    }, [])
    

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;