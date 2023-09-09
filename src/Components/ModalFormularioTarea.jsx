import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'
import Alerta from './Alerta'
const ModalFormularioTarea = () => {
    const params = useParams()
 
    const {handleClickModal, modalFormularioTarea, setAlerta, alerta, submitTarea,tarea} = useProyectos()

    const [nombre,setNombre] = useState('')
    const [descripcion,setDescripcion] = useState('')
    const [fechaEntrega,setFechaEntrega] = useState('')
    const [prioridad,setPrioridad] = useState('')

    const PRIORIDADES = ['Baja','Media','Alta']

    useEffect(() => {
        console.log(tarea)
    }, [tarea])
    

    const handleSubmit = async e => {
        e.preventDefault()
        if([nombre,descripcion,prioridad].includes('')){
            setAlerta({
                msj: 'Todos los campos son obligatorios',
                error: true 
            })
            return
        }

        await submitTarea({nombre,descripcion,prioridad,fechaEntrega,proyecto: params.id})

        // Resetear Formualario
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')
    }

    const {msj} = alerta
    return (
        <Transition.Root show={modalFormularioTarea} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleClickModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleClickModal}
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-2xl leading-6 font-bold text-gray-900">
                                        Crear Tarea
                                    </Dialog.Title>
                                    {msj && <Alerta alerta={alerta}/>}
                                    <form className='my-5' onSubmit={handleSubmit}>
                                        <div className='mb-3'>
                                            <label 
                                                htmlFor="nombre"
                                                className='uppercase font-bold'
                                            >
                                                Nombre
                                            </label>
                                            <input 
                                                type="text" 
                                                id="nombre" 
                                                placeholder='Nombre de la tarea'
                                                className='w-full border-2 rounded p-2 mt-2' 
                                                value={nombre}
                                                onChange={e => setNombre(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label 
                                                htmlFor="descripcion"
                                                className='uppercase font-bold'
                                            >
                                                Descripcion
                                            </label>
                                            <textarea 
                                                id="descripcion" 
                                                placeholder='Descripcion de la tarea'
                                                className='w-full border-2 rounded p-2 mt-2' 
                                                value={descripcion}
                                                onChange={e => setDescripcion(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label 
                                                htmlFor="fecha-entrega"
                                                className='uppercase font-bold'
                                            >
                                                Fecha Entrega
                                            </label>
                                            <input 
                                                type="date" 
                                                id="fecha-entrega" 
                                                className='w-full border-2 rounded p-2 mt-2' 
                                                value={fechaEntrega}
                                                onChange={e => setFechaEntrega(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label 
                                                htmlFor="prioridad"
                                                className='uppercase font-bold'
                                            >
                                                Prioridad
                                            </label>
                                           <select 
                                                id="prioridad"
                                                value={prioridad}
                                                className='w-full border-2 rounded p-2 mt-2' 
                                                onChange={e => setPrioridad(e.target.value)}
                                            >
                                                <option value="">--Seleccionar--</option>
                                                {PRIORIDADES.map(item => (
                                                    <option key={item} value={item}>{item}</option>
                                                ))}
                                           </select>
                                        </div>

                                        <input 
                                            type="submit" 
                                            value="Crear Tarea"
                                            className='w-full bg-sky-600 hover:bg-sky-700 transition-colors p-2 rounded-md text-white text-md cursor-pointer'
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea