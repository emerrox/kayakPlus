import { toast } from 'sonner';
import { GROUP_URL, MY_GROUPS_URL } from '@/apiName';
import useIsLogged from '@/contexts/useIsLogged';

const useGroups = () => {
  const { token } = useIsLogged();

  const createGroup = async () => {
    try {
      const response = await fetch(GROUP_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ name: 'kayak-prueba22' })
      });
      if (!response.ok) {
        throw new Error(`Error al crear grupo: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Grupo creado:', data);
      toast.success('Grupo creado correctamente');
    } catch (error) {
      console.log('error: ', error);    
      toast.error('Error al crear grupo');
    }
  };

  const deleteGroup = async () => {
    try {
      const response = await fetch(GROUP_URL, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ id: "86e47c5e-dd5a-4430-a4aa-d0c7658f74c1" })
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar grupo: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Grupo eliminado:', data);
      toast.success('Grupo eliminado correctamente');
    } catch (error) {
      console.log('error: ', error);    
      toast.error('Error al eliminar grupo');
    }
  };

  const getGroups = async () => {
    try {
      const response = await fetch(MY_GROUPS_URL, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      if (!response.ok) {
        throw new Error(`Error al ver tus grupos: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            toast('Grupos: '+ data.map((group: any) => group.name).join(', '))
      return data;
    } catch (error) {
      console.log('error: ', error);    
      toast.error('Error al ver tus grupos');
    }
  };

  return { createGroup, deleteGroup, getGroups };
};

export default useGroups;


  