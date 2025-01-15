import { EVENTS_URL } from "@/apiName";
import useIsLogged from "@/contexts/useIsLogged";
import { creteEventProps } from "@/types";
import { toast } from "sonner";
const useEvents = ()=>{
  const { token } = useIsLogged.getState();

  
  
  
  const createEvent = async ({groupId, summary, startTime, endTime, description}: creteEventProps) => {
      try {
        const response=await fetch(EVENTS_URL,{
          method: 'POST',
          headers: {
            "Content-Type": "application/json", 
            "Authorization": token
          },
          body: JSON.stringify({
            group_id: groupId,
            event:{
              summary: summary,
              start: {
                  dateTime: startTime,
              },
              end: {
                  dateTime: endTime,
              },
              description: description,
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