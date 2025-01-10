import { INVITES_URL } from '@/apiName';
import useIsLogged from '@/contexts/useIsLogged';
import { toast } from 'sonner';


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
      return data.link
    } catch (error) {
      console.log('error: ', error);    
      toast.error('Error al crear invitación');
    }
  };


  const getInvites = async (groupId: string) => {
    try {
      const response = await fetch(`${INVITES_URL}?groupId=${groupId}`, {
        method: 'GET',
        headers: {
          "Authorization": token
        },
      });

      if (response.status !== 200) {
        return null;
      }

      const data = await response.json();
      return data.link; 
    } catch (error) {
      console.log('error: ', error);
      return null;
    }
  };

  return { createInvite, getInvites };
};

export default useInvites;