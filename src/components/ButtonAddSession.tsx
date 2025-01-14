import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { PlusCircleIcon, Calendar as CalendarIcon } from "lucide-react";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
  import { Calendar } from "@/components/ui/calendar";
  import { useState } from "react";
  import { format } from "date-fns";
  import { es } from "date-fns/locale";
  
  function ButtonAddSession() {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform">
            Añadir entreno <PlusCircleIcon />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Nueva sesión</DialogTitle>
          <DialogDescription>Completa los campos para agregar un nuevo entreno.</DialogDescription>
          <div className="grid gap-4 py-4">
            {/* Nombre */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" placeholder="Nombre del entreno" className="col-span-3" />
            </div>
  
            {/* Descripción */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Input id="description" placeholder="Descripción del entreno" className="col-span-3" />
            </div>
  
            {/* Fecha de inicio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Fecha de inicio
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="col-span-3 flex items-center justify-between w-full px-4 py-2 border rounded-md text-left text-gray-700"
                    type="button"
                  >
                    {startDate
                      ? format(startDate, "PPP", { locale: es })
                      : "Seleccionar fecha"}
                    <CalendarIcon className="ml-2 h-5 w-5 text-gray-500" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    locale={es}
                    className="border rounded-lg"
                  />
                </PopoverContent>
              </Popover>
            </div>
  

          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default ButtonAddSession;
  