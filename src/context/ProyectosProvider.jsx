import { createContext, useState , useEffect} from "react";
import clienteAxios from "../config/clienteAxios";
import {useNavigate} from 'react-router-dom'
const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
    const [proyectos,setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto,setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const navigate = useNavigate()

    const handleAlerta = (infoAlerta)=>{
        setAlerta(infoAlerta)
        setTimeout(() => {
           setAlerta({}) 
        }, 3000);
    }

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

    useEffect(() => {
        obtenerProyectos()
    }, [])
    
    const submitProyecto = async (proyectoForm) => {
        

        if(proyecto._id){
            console.log('editando proyecto jej')
            await editarProyecto(proyectoForm)
        }else{
            console.log('nuevo proyecto jej')
            await crearProyecto(proyectoForm)
        }

    } 

    const crearProyecto = async (proyecto) => {

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

    const editarProyecto = async (proyectoForm) => {

        const token = localStorage.getItem('token')
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.put(`/proyectos/${proyecto._id}`,proyectoForm,config)

            // Sincronizar state
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id == data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)

            // Mostrar alerta
            setAlerta({
                msj: 'Se guardaron los cambios',
                error: false
            })

            // Redireccionar
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async (id) => {
        const token = localStorage.getItem('token')
        
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            setCargando(true)
           const {data} = await clienteAxios(`/proyectos/${id}`,config)
           console.log(data) 
           setProyecto(data)
        } catch (error) {
            console.log(error)
        }finally{
            setCargando(false)
        }
    }

    const eliminarProyecto = async (id) => {
        const token = localStorage.getItem('token')
        
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
          const {data} = await clienteAxios.delete(`/proyectos/${id}`,config)  
          console.log(data)
          const proyectosUpdate = proyectos.filter(proyectoState => proyectoState._id !== id)
          setProyectos(proyectosUpdate)

          setAlerta({
            msj: data.msj,
            error: false,
          })

          setTimeout(() => {
            setAlerta({})
            navigate('/proyectos')
          }, 2000);

        } catch (error) {
            console.log(error)
        }
        
    }

    const handleClickModal = () => {
        setModalFormularioTarea(!modalFormularioTarea)
    }

    const submitTarea = async (tarea) => {

        const token = localStorage.getItem('token')
        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.post('/tareas',tarea,config)  
            console.log(data)
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
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                setProyecto,
                eliminarProyecto,
                obtenerProyectos,
                handleClickModal,
                modalFormularioTarea,
                submitTarea
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