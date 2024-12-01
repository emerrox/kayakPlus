import FullCalendar from "@fullcalendar/react";
import dayGridWeekPlugin from "@fullcalendar/daygrid"; // Plugin para vista de semana
import esLocale from "@fullcalendar/core/locales/es";

export default function Calendar() {
  return (
    // <div
      // className="p-12 rounded-3xl bg-gradient-to-br from-[#aabae9] to-[#7ba8dc00] 
      //            bg-no-repeat outline outline-2 outline-[#1d2738] 
      //            shadow-[0px_8px_20px_rgba(90,113,205,0.2)] 
      //            h-[50vh] min-h-[500px] transition-all duration-300 
      //            hover:shadow-[5px_10px_10px_rgba(115,124,173,0.838)]"
    // >

      <FullCalendar
        plugins={[dayGridWeekPlugin]}
        locale={esLocale}
        initialView="dayGridWeek"
        height="100%"
        dayHeaderClassNames="bg-blue-500 text-white font-bold"
        eventClassNames="bg-green-500 text-sm text-center rounded-md shadow-lg"
        slotLabelClassNames="text-gray-700 font-medium"
        events={[
          // Eventos de prueba
          { title: "Evento 1", date: "2024-11-26" },
          { title: "Evento 2", date: "2024-11-27" },
        ]}
      />
    // </div>
  );
}
