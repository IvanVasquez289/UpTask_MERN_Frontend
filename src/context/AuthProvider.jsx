import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth,setAuth] = useState({})

    useEffect(() => {
        const comprobarToken = async () => {
            const token = localStorage.getItem('token')
            
            if(!token){
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
            } catch (error) {
                console.log(error.response.data.msj)
            }

        }

        comprobarToken()
    }, [])
    

    return (
        <AuthContext.Provider
            value={{
                setAuth
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