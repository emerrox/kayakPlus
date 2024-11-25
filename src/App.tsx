import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import InicioSesion from './components/InicioSesion'
import Home from './components/Home'

function App() {
  return (
    <>
      <header>
        <h1>KAYAK+</h1>
      </header>
      
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    
      <footer>
        <p>KAYAK+</p>
        <p>desarrollado por Emerrox - Mauro Cordal</p>
      </footer>
    </>
  )
}

export default App
