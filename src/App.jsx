import {BrowserRouter,Routes,Route} from 'react-router-dom'

// Layouts
import AuthLayout from './Layouts/AuthLayout.jsx'

// Paginas
import Login from './Pages/Login.jsx'
import Registrar from './Pages/Registrar.jsx'
import OlvidePassword from './Pages/OlvidePassword.jsx'
import NuevoPassword from './Pages/NuevoPassword.jsx'
import ConfirmarCuenta from './Pages/ConfirmarCuenta.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path='registrar' element={<Registrar/>}/>
          <Route path='olvide-password' element={<OlvidePassword/>}/>
          <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
          <Route path='confirmar-cuenta/:token' element={<ConfirmarCuenta/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
