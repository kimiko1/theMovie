import { createRoot } from 'react-dom/client'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router.jsx'
import { AuthController } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthController>
    <Router />
  </AuthController>
  </BrowserRouter>,
)