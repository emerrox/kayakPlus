import { toast } from 'sonner';
import { INVITES_URL } from '../../apiName';
import useIsLogged from '../../contexts/useIsLogged';

const useInvites = () => {
  const { token } = useIsLogged();

  const createInvite = async (groupId: string, usesRemaining: number) => {
    try {
      const response = await fetch(INVITES_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
          "Authorization": token
        },
        body: JSON.stringify({ 
          groupId,
          usesRemaining,
        })
      });
      if (response.status !== 200) {
        console.log(`Error al crear la invitación: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      console.log(data);
      toast.success('Invitación creada correctamente');
    } catch (error) {
      console.log('error: ', error);    
      toast.error('Error al crear invitación');
    }
  };

  return { createInvite };
};

export default useInvites;