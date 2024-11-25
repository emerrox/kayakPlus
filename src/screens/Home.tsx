import React from "react";
import { useNavigate } from "react-router-dom";
import useIsLogged from "../hooks/useIsLogged";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const toggleLogin = useIsLogged((state) => state.toggleLogin);

  // Función para cerrar sesión
  const handleLogout = () => {
    toggleLogin()
    localStorage.removeItem("isLoggedIn");
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  return (
    <div>
      <h2>Bienvenido a Home</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Home;
