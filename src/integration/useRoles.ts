import { toast } from 'sonner';
import { MY_GROUPS_URL } from '../apiName';
import useIsLogged from '../contexts/useIsLogged';

const useRoles = () => {
  const { token } = useIsLogged();

  const setRole = async (groupId: string, newRole: string, email: string) => {
    try {
      const response = await fetch(MY_GROUPS_URL, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ 
          groupId,
          newRole,
          email,
        })
      });
      if (response.status !== 200) {
        console.log(`Error al cambiar el rol: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      console.log(data);
      toast.success('Rol cambiado correctamente');
    } catch (error) {
      console.log('error: ', error); 
      toast.error('Error al cambiar rol');
    }
  };

  return { setRole };
};

export default useRoles;