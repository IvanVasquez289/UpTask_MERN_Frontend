import {BrowserRouter,Routes,Route} from 'react-router-dom'

// Layouts
import AuthLayout from './Layouts/AuthLayout.jsx'
import RutaProtegida from './Layouts/RutaProtegida.jsx'

// Paginas
import Login from './Pages/Login.jsx'
import Registrar from './Pages/Registrar.jsx'
import OlvidePassword from './Pages/OlvidePassword.jsx'
import NuevoPassword from './Pages/NuevoPassword.jsx'
import ConfirmarCuenta from './Pages/ConfirmarCuenta.jsx'
import Proyectos from './Pages/Proyectos.jsx'
import CrearProyecto from './Pages/CrearProyecto.jsx'
import EditarProyecto from './Pages/EditarProyecto.jsx'
import NuevoColaborador from './Pages/NuevoColaborador.jsx'
// Context 
import { AuthProvider } from './context/AuthProvider.jsx'
import {ProyectosProvider} from './context/ProyectosProvider.jsx'
import Proyecto from './Pages/Proyecto.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>

          <Routes>

            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='registrar' element={<Registrar/>}/>
              <Route path='olvide-password' element={<OlvidePassword/>}/>
              <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
              <Route path='confirmar-cuenta/:token' element={<ConfirmarCuenta/>}/>
            </Route>

            <Route path='/proyectos' element={<RutaProtegida/>}>
              <Route index element={<Proyectos/>}/>
              <Route path='crear-proyecto' element={<CrearProyecto/>}/>
              <Route path='nuevo-colaborador/:id' element={<NuevoColaborador/>}/>
              <Route path=':id' element={<Proyecto/>}/>
              <Route path='editar/:id' element={<EditarProyecto/>}/>
            </Route>

          </Routes>
          
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
