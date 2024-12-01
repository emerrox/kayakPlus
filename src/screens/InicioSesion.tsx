import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useIsLogged from "../hooks/useIsLogged";

const InicioSesion: React.FC = () => {

type User = {
  name :string
  password : string
  role: 'admin' | 'user'
}

const users: User[] = [
  {
    name: 'admin',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'user1',
    password: 'user123',
    role: 'user',
  },
  {
    name: 'calamardo',
    password: 'clarinete',
    role: 'user',
  },
];



  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("")

  const navigate = useNavigate();
  const toggleLogin = useIsLogged((state) => state.toggleLogin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "");
    
    if ( users.find((u)=>u.name === username && u.password === password) ) {
      toggleLogin()
      localStorage.setItem("isLoggedIn", "true");
      setError("")
      navigate("/home"); 
    }else{
      setError("algo anda mal")
    }

  };

  return (
    <div className="cont">
      <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error!= "" && <p>{error}</p>}
    </div>
  );
};

export default InicioSesion;
