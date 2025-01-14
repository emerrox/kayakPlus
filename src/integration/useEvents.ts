import { EVENTS_URL } from "@/apiName";
import useIsLogged from "@/contexts/useIsLogged";
import { toast } from "sonner";
const useEvents = ()=>{
  const { token } = useIsLogged.getState();
  
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
      toast.success('Evento creado correctamente')
      } catch (error) {
        console.log('error: ', error);
        toast.error('Error al crear evento')
      }
    }

    return {createEvent}
}

export default useEvents