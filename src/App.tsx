import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import InicioSesion from './screens/InicioSesion'
import Home from './screens/Home'
import Landing from './screens/Landing'
import useIsLogged from './hooks/useIsLogged'
import { useEffect } from 'react'

function App() {
  const isLoggedIn = useIsLogged((state) => state.isLoggedIn);
  const setLog = useIsLogged((state) => state.setLogin);
  useEffect(()=>{
    setLog(localStorage.getItem("isLoggedIn") == "true")
  },[setLog])
  return (
    <>
      <header>
        <h1>KAYAK+</h1>
      </header>
      
    <Router>
      <Routes>

        <Route path="/" element= {<Landing />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <InicioSesion />} />
        <Route path="/home" element={!isLoggedIn ? <Navigate to="/login" /> : <Home /> } />

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
