import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Fullcalendar";
import { googleLogout } from "@react-oauth/google";
import { LOGOUT_URL } from '../apiName'

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    googleLogout();
    try {
      await fetch(LOGOUT_URL,{
        method: "POST",
        credentials: 'include'
      })
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full p-5" >

      {/* Título */}
      <h2 className="text-2xl font-bold text-center text-textPrimary">Bienvenido a Home</h2>

      {/* Calendario */}
      <div className="w-full max-w-7xl overflow-hidden p-12 rounded-3xl 
                      bg-backgroundColor bg-no-repeat 
                      border-2 border-gray-400
                      shadow-[0px_8px_20px_rgba(90,113,205,0.2)] 
                      h-[50vh] min-h-[500px] transition-all duration-300 
                      hover:shadow-[5px_10px_10px_rgba(115,124,173,0.838)] relative 
                      ">
        <div className='absolute left-2/4 -translate-y-48 overflow-hidden rounded-full w-96 h-96 blur-3xl mix-blend opacity-30 bg-royal-blue-400 '></div>
        <Calendar />
      </div>

      {/* Botón para cerrar sesión */}
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;
