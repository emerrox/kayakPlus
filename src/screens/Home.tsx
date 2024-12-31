import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import Calendar from "../components/Fullcalendar";
import { EVENTS_URL, GROUP_URL, INVITES_URL, MY_GROUPS_URL } from "../apiName";
import useIsLogged from "../contexts/useIsLogged";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useIsLogged()
 

  const handleLogout = async () => {
    googleLogout();
    navigate("/");
  };

  const createGroup = async () => {
    try {
      const response=await fetch(GROUP_URL,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ name: 'kayak-prueba22' })
      })
      if (!response.ok) {
        throw new Error(`Error al crear grupo: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Grupo creado:', data);
      
    } catch (error) {
      console.log('error: ', error);    
    }
  }

  const deleteGroup = async () => {
    try {
      const response=await fetch(GROUP_URL,{
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ id: "86e47c5e-dd5a-4430-a4aa-d0c7658f74c1" })
      })
      if (!response.ok) {
        throw new Error(`Error al eliminar grupo: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Grupo eliminado:', data);
      
    } catch (error) {
      console.log('error: ', error);    
    }
  }

  const getGroups = async () => {
    try {
      const response=await fetch(MY_GROUPS_URL,{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
      if (!response.ok) {
        throw new Error(`Error al ver tus grupos: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.log('error: ', error);    
    }
  }

  const getOutFromGroup = async () => {
    try {
      const response=await fetch(MY_GROUPS_URL,{
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ groupId: "86e47c5e-dd5a-4430-a4aa-d0c7658f74c1"})
      })
      if (response.status!=200) {
        console.error(`Error al salir del grupo: ${response.json}`);
      }
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.log('error: ', error);    
    }
  }

  const createInvite = async () => {
    try {
      const response=await fetch(INVITES_URL,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ 
          groupId: "86e47c5e-dd5a-4430-a4aa-d0c7658f74c1",
          usesRemaining: 5,
        })
      })
      if (response.status!=200) {
        console.log(`Error al salir del grupo: ${response.json}`);
      }
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.log('error: ', error);    
    }
  }

  const setRole = async () => {
    try {
      const response=await fetch(MY_GROUPS_URL,{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ 
          groupId: "86e47c5e-dd5a-4430-a4aa-d0c7658f74c1",
          newRole: 'writer',
          email: 'maurocasaldarnos@gmail.com',
        })
      })
      if (response.status!=200) {
        console.log(`Error al salir del grupo: ${response}`);
      }
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.log('error: ', error);    
    }
  }

  const createEvent = async () => {
    try {
      const response=await fetch(EVENTS_URL,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({
          group_id: "ed609083-ccca-4db9-ac70-b60d8ddab034",
          event:{
            summary: 'Reunión de proyecto',
            start: {
                dateTime: '2024-12-30T10:00:00-03:00',
            },
            end: {
                dateTime: '2024-12-30T11:00:00-03:00',
            },
            description: 'Revisar avances del sprint',
          }
      })
    })
    if (response.status!=201) {
      console.log(`Error al crear el evento: ${response.json()}`);
    }
    const data = await response.json();
    console.log(data);
      
    } catch (error) {
      console.log('error: ', error);    
    }
  }


  return (
    <div className="flex flex-col items-center gap-12 w-full p-5" >
      <h2 className="text-2xl font-bold text-center text-textPrimary">Bienvenido a Home</h2>
      <Calendar />

      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
      >
        Cerrar sesión
      </button>

      <button
        onClick={createGroup}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
      >Crear grupo
      </button>

      <button
        onClick={deleteGroup}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
      >Eliminar grupo
      </button>

      <button
        onClick={getGroups}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
      >console log grupos
      </button>

      <button
        onClick={getOutFromGroup}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
      >salir de grupo
      </button>
      <button
        onClick={createInvite}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
      >crear enlace invitacion
      </button>
      <button
        onClick={setRole}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
      >cambiar a reader
      </button>
      <button
        onClick={createEvent}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
      >crear evento
      </button>
    </div>
  );
};

export default Home;
