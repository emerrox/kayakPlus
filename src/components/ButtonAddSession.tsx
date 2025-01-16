import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import useEvents from "@/integration/useEvents";
import { creteEventProps, Groups } from "@/types";
import useGroups from "@/integration/useGroups";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { Bloques } from "./Bloques";

function ButtonAddSession() {
  const { createEvent } = useEvents();
  const { getGroups } = useGroups();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [groups, setGroups] = useState<Groups[] | null>(null);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]); 
  const [startTimeInput, setStartTimeInput] = useState<string>("16:00"); 

  useEffect(() => {
    async function fetchGroups() {
      const g = await getGroups();
      const groups = g?.filter((gr) => gr.role === 'writer');
      setGroups(groups ?? null);
    }
    fetchGroups();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId) // Desmarcar
        : [...prev, groupId] // Marcar
    );
  };

  const handleClear = ()=>{
      setName("");
      setDescription("");
      setStartDate(undefined);
  }

  const handleCreate = async () => {
    if (!name || !description || !startDate || selectedGroups.length === 0 || !startTimeInput) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
  
    const [hours, minutes] = startTimeInput.split(":").map((str) => parseInt(str, 10));
  
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setHours(hours, minutes, 0, 0);
  
    const formattedStartTime = adjustedStartDate.toISOString();
  
    const endDate = new Date(adjustedStartDate);
    endDate.setHours(endDate.getHours() + 1);
    const formattedEndTime = endDate.toISOString();
  
    const newSession: creteEventProps = {
      groupId: '',
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      summary: name,
      description: description,
    };
  
    try {
      for (const groupId of selectedGroups) {
        newSession.groupId = groupId;
        await createEvent(newSession);
      }
      toast.success("Sesión creada exitosamente");
  
      setName("");
      setDescription("");
      setStartDate(undefined);
    } catch (error) {
      toast.error("Error al crear la sesión");
      console.error(error);
    }
  };
  
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md items-center hover:scale-105 transition-transform">
          Añadir entreno <PlusIcon className="inline h-[21px]" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Nueva sesión</DialogTitle>
        <DialogDescription>
          Completa los campos para agregar un nuevo entreno.
        </DialogDescription>
        <div className="grid gap-4 py-4">
          {/* Nombre */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              placeholder="Nombre del entreno"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Descripción */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Input
              id="description"
              placeholder="Descripción del entreno"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Fecha de inicio */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Fecha y hora
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="col-span-2 flex items-center justify-between w-full px-4 py-2 border rounded-md text-left text-gray-700"
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

          <Input
            type="time"
            id="startTime"
            className=" w-fit "
            value={startTimeInput}
            onChange={(e) => setStartTimeInput(e.target.value)}
          />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">

        </div>


        {/* Select grupo */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="group" className="text-right">
            Grupo
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <div className="col-span-3 w-full px-3 py-2 border rounded-md text-gray-700 bg-white flex justify-between">
                Elige grupos <ChevronDown className=" inline "/>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-2">
                {groups?.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center justify-between space-x-2"
                  >
                    <Label
                      htmlFor={`group-${group.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {group.name}
                    </Label>
                    <Checkbox
                      id={`group-${group.id}`}
                      checked={selectedGroups.includes(group.id)}
                      onCheckedChange={() => handleGroupToggle(group.id)}
                    />
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* bloques de entrenamiento */}
        <Bloques/>

        {/* Botón Crear */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleClear}
          >
            Limpiar
          </Button>

          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md items-center hover:scale-105 transition-transform"
            onClick={handleCreate}
          >
            Crear
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ButtonAddSession;
