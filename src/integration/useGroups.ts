import { toast } from 'sonner';
import { GROUP_URL, MY_GROUPS_URL } from '@/apiName';
import useIsLogged from '@/contexts/useIsLogged';
import { Group_extended, Groups } from '@/types';

const useGroups = () => {
  const { token } = useIsLogged();

  const createGroup = async (name: string) => {
    try {
      const response = await fetch(GROUP_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ name: name })
      });
      if (!response.ok) {
        throw new Error(`Error al crear grupo: ${response.statusText}`);
      }
      const data = await response.json();
      // console.log('Grupo creado:', data);
      toast.success('Grupo creado correctamente');
      return data;
    } catch (error) {
      console.log('error: ', error);    
      toast.error('Error al crear grupo');
    }
  };

  const deleteGroup = async (id:string) => {
    try {
      const response = await fetch(GROUP_URL, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ id: id })
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

  async function getGroups(): Promise<Groups[]|undefined> {
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

  async function getGroup(id: string): Promise<Group_extended|undefined> {
    try {
      const response = await fetch(`${MY_GROUPS_URL+"/" + id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      });
      if (!response.ok) {
        throw new Error(`Error al ver tu grupo: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    }catch (error) {
      console.log('error: ', error);    
    }
  }

  async function deleteUserFromGroup (groupId: string, email: string) {
    try {
      const response = await fetch(MY_GROUPS_URL, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ groupId, email })
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar usuario del grupo: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      toast.success('Usuario eliminado del grupo correctamente');
    }
    catch (error) {
      console.log('error: ', error);    
      toast.error('Error al eliminar usuario del grupo');
    }
  }

  return { createGroup, deleteGroup, getGroups, getGroup, deleteUserFromGroup };
};

export default useGroups;


  