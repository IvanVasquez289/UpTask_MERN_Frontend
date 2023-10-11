import { createContext, useState , useEffect} from "react";
import clienteAxios from "../config/clienteAxios";
import {useNavigate} from 'react-router-dom'
import io from 'socket.io-client'
const ProyectosContext = createContext();

let socket;

const ProyectosProvider = ({children}) => {
    const [proyectos,setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto,setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [tarea,setTarea] = useState({})
    const [modalEliminarTarea,setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)

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
    
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
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
           setAlerta({})
           setCargando(true)
           const {data} = await clienteAxios(`/proyectos/${id}`,config)
        //    console.log(data) 
           setProyecto(data)
        } catch (error) {
            navigate('/proyectos')
            handleAlerta({
                msj: error.response.data.msj,
                error:true
            })
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
            // * Ahora esta parte la hara socket.io
            // Actualizar Tareas del proyecto
            // const proyectoUpdate = {...proyecto}
            // proyectoUpdate.tareas = [...proyecto.tareas, data]
            // setProyecto(proyectoUpdate) 

            setAlerta({})
            setModalFormularioTarea(false)

            // SOCKET IO
            socket.emit('nueva tarea', data)
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
           
            setModalFormularioTarea(false)
            setAlerta({})
            // SOCKET IO
            socket.emit('editar tarea', data)
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
           
            
            // SOCKET IO
            socket.emit('eliminar tarea', tarea)

            setTarea({})
            setModalEliminarTarea(false)

            setTimeout(() => {
                setAlerta({})
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const submitColaborador = async (email) => {
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
            const {data} = await clienteAxios.post('/proyectos/colaboradores',{email},config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            handleAlerta({
                msj: error.response.data.msj,
                error:true
            })
           setColaborador({})
        }finally{
            setCargando(false)
        }
    }


    const agregarColaborador = async email => {
 
        const token = localStorage.getItem('token')
        if (!token) return;
      
        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,email,config)
            console.log(data)
            handleAlerta({
                msj: data.msj,
                error:false
            })
            setColaborador({})
        } catch (error) {
            setAlerta({
                msj: error.response.data.msj,
                error:true
            })
        }
    }

    const handleModalEliminarColaborador = async (colaboradorInput) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaboradorInput)
    }

    const eliminarColaborador = async () => {
        const token = localStorage.getItem('token')
        if (!token) return;
      
        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`,{id: colaborador._id},config)
            console.log(data)
            handleAlerta({
                msj: data.msj,
                error:false
            })
            setColaborador({})
            setModalEliminarColaborador(false)

            // * Actualizar DOM
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(
                colaboradorState => colaboradorState._id !== colaborador._id
            )
            setProyecto(proyectoActualizado)
        } catch (error) {
            console.log(error.response)
        }
    } 

    const completarTarea = async (id) => {
        const token = localStorage.getItem('token')
        if (!token) return;
      
        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.put(`/tareas/estado/${id}`,{},config)
            console.log(data)
           
            // SOCKET IO
            socket.emit('completar tarea', data)
           
            setAlerta({})
            setTarea({})
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    //? SOCKET IO

    const submitTareasProyecto = (tarea) => {
        // Actualizar Tareas del proyecto
        const proyectoUpdate = {...proyecto}
        proyectoUpdate.tareas = [...proyecto.tareas, tarea]
        setProyecto(proyectoUpdate) 
    }

    const eliminarTareasProyecto = tarea => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)
        setProyecto(proyectoActualizado)
    }

    const editarTareasProyecto = tarea => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id == tarea._id ? tarea : tareaState )
        setProyecto(proyectoActualizado)
        
    }

    const completarTareasProyecto = tarea => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }

    const cerrarSesionProyectos =  () => {
        setProyectos({})
        setProyecto({})
        setAlerta({})
        setTarea({})
        setColaborador({})
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
                submitColaborador,
                colaborador,
                agregarColaborador,
                setColaborador,
                handleModalEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareasProyecto,
                eliminarTareasProyecto,
                editarTareasProyecto,
                completarTareasProyecto,
                cerrarSesionProyectos
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