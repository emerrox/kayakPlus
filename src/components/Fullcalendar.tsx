import FullCalendar from "@fullcalendar/react";
import dayGridWeekPlugin from "@fullcalendar/daygrid"; // Plugin para vista de semana
import esLocale from "@fullcalendar/core/locales/es";
import { useEffect, useState } from "react";
import { EVENTS_URL } from "../apiName";
import useIsLogged from "../contexts/useIsLogged";

export default function Calendar() {
  const {token} = useIsLogged()
  const [events, setEvents] = useState<Event[]>([]); 
  useEffect(()=>{
    fetch(EVENTS_URL,{
      method:"GET",
      headers: {
        'Authorization': token,
    }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.json}`);
      }
      return response.json();
    })
    .then(data => {
      setEvents(data);
    })
    .catch(error => {
      console.error("Error al obtener los eventos:", error);
    });
  },[token])

  return (
    <div className="w-full max-w-7xl overflow-hidden p-12 rounded-3xl 
                    bg-backgroundColor bg-no-repeat 
                    border-2 border-gray-400
                    shadow-[0px_8px_20px_rgba(90,113,205,0.2)] 
                    h-[50vh] min-h-[500px] transition-all duration-300 
                    hover:shadow-[5px_10px_10px_rgba(115,124,173,0.838)] relative 
                    ">
    
      <FullCalendar
        plugins={[dayGridWeekPlugin]}
        locale={esLocale}
        initialView="dayGridWeek"
        height="100%"
        dayHeaderClassNames="bg-blue-500 text-white font-bold"
        eventClassNames="bg-green-500 text-sm text-center rounded-md shadow-lg"
        slotLabelClassNames="text-gray-700 font-medium"
        events={events}
      />
    </div>
  );
}
