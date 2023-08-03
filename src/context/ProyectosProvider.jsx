import { createContext, useState } from "react";
import clienteAxios from "../config/clienteAxios";
const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
    const [proyectos,setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})

    const handleAlerta = (infoAlerta)=>{
        setAlerta(infoAlerta)
        setTimeout(() => {
           setAlerta({}) 
        }, 3000);
    }

    const submitProyecto = async (proyecto) => {
        console.log(proyecto)
    } 
    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                setAlerta,
                alerta,
                handleAlerta,
                submitProyecto
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext