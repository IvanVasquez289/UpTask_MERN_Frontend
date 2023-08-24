import { createContext, useState , useEffect} from "react";
import clienteAxios from "../config/clienteAxios";
import {useNavigate} from 'react-router-dom'
const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
    const [proyectos,setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})

    const navigate = useNavigate()

    const handleAlerta = (infoAlerta)=>{
        setAlerta(infoAlerta)
        setTimeout(() => {
           setAlerta({}) 
        }, 3000);
    }

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "Application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/proyectos',config)
                setProyectos(data)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerProyectos()
    }, [])
    
    const submitProyecto = async (proyecto) => {
        const token = localStorage.getItem('token')
        
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.post('/proyectos',proyecto,config)
            setProyectos([...proyectos,data])
            setAlerta({
                msj: 'Proyecto creado correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);

        } catch (error) {
            console.log(error)
        }
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