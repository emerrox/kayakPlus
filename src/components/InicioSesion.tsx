import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ( users.find((u)=>u.name === username && u.password === password) ) {
      setError("")
      navigate("/home"); 
    }else{
      setError("algo anda mal")
    }

  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {error!= "" && <p>{error}</p>}
    </div>
  );
};

export default InicioSesion;
