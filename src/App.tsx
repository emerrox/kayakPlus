import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
// import InicioSesion from './screens/InicioSesion';
import Home from './screens/Home';
import Landing from './screens/Landing';


function App() {


  return (
    <div className="font-geist
                    m-0 p-0
                    flex flex-col items-center justify-around
                    min-h-screen px-5 overflow-auto
                  bg-backgroundColor text-textPrimary">
      <header className="text-center mb-10 w-full">
        <h1 className="font-headings text-4xl font-extrabold tracking-wide mb-8">KAYAK+</h1>
      </header>


      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <InicioSesion />} /> */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <div className='fixed bottom-0 -right-0 translate-x-48 rounded-full w-96 h-96 blur-3xl mix-blend opacity-30 bg-royal-blue-900'></div>
      <footer className="mt-10">
        <p className="text-sm">KAYAK+ desarrollado por Emerrox - Mauro Cordal</p>
      </footer>
    </div>
  );
}

export default App;
