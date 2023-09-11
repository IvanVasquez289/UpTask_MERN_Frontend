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
    const [tarea,setTarea] = useState({})
    const [modalEliminarTarea,setModalEliminarTarea] = useState(false)

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
        setTarea({})
        setModalFormularioTarea(!modalFormularioTarea)
    }

    const submitTarea = async (tareaForm) => {
        if(tarea._id){
            await editarTarea(tareaForm)
        }else{
            await crearTarea(tareaForm)
        }
    }

    const crearTarea = async (tareaForm) => {
        const token = localStorage.getItem('token')
        if (!token) return;
    
        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }
    
        try {
            const {data} = await clienteAxios.post('/tareas',tareaForm,config)  
            console.log(data)
            // Actualizar Tareas del proyecto
            const proyectoUpdate = {...proyecto}
            proyectoUpdate.tareas = [...proyecto.tareas, data]
            setProyecto(proyectoUpdate) 
            setAlerta({})
            setModalFormularioTarea(false)
        } catch (error) {
            console.log(error)
        }
    }

    const editarTarea = async (tareaForm) => {
        const token = localStorage.getItem('token')
        if (!token) return;
      
        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }
      
        try {
            const {data} = await clienteAxios.put(`/tareas/${tarea._id}`,tareaForm,config)
            console.log(data)
            // TODO: ACTUALIZAR DOM
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id == data._id ? data : tareaState )
            setProyecto(proyectoActualizado)
            setModalFormularioTarea(false)
            setAlerta({})
        } catch (error) {
            console.log(error)
        }
      }

    // handleClickEditarTarea
    const handleClickTarea = (tarea) => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    //* Este sirve para cerrar el modal
    const handleModalEliminarTarea = () => {
        setTarea({})
        setModalEliminarTarea(!modalEliminarTarea)
    }
    
    //* Este para abrirlo
    const handleClickEliminarTarea = (tarea) => {
        setTarea(tarea)
        setModalEliminarTarea(true)
    }

    //* Este al dar confirmar la eliminacion
    const eliminarTarea = async () => {
        const token = localStorage.getItem('token')
        if (!token) return;
      
        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`,config)
            setAlerta({
                msj: data.msj,
                error: false
            })
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)
            setProyecto(proyectoActualizado)
            setTarea({})
            setModalEliminarTarea(false)

            setTimeout(() => {
                setAlerta({})
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
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                setProyecto,
                eliminarProyecto,
                obtenerProyectos,
                handleClickModal,
                modalFormularioTarea,
                submitTarea,
                handleClickTarea,
                tarea,
                handleModalEliminarTarea,
                handleClickEliminarTarea,
                modalEliminarTarea,
                eliminarTarea,

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