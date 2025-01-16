import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface BloqueProps {
  className?: string;
}

const colores = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];
export function Bloques() {
  const [divs, setDivs] = useState<string[]>([]);


  const createNewBloque = () => {
    setDivs([...divs, `Div ${divs.length + 1}`]);
  };

  return (
    <div className="w-full min-h-8 h-fit my-4 m-auto bg-zinc-300 rounded-sm flex p-4 flex-col justify-center aling-center gap-5 items-center">
      {divs.map((_, index) => (
        <Bloque className={`w-4/5 min-h-11 h-fit rounded-sm flex flex-col items-center justify-center text-white font-semibold ${colores[index % colores.length]}`}/>
      ))}
      
      <button
        onClick={createNewBloque}
        className="w-8 min-h-8 h-fit text-center flex justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md items-center hover:scale-105 transition-transform"
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export function Bloque({className}: BloqueProps){
  const [series, setSeries] = useState<string[]>([]);
  const createNewSerie = () => {
    setSeries([...series, `Div ${series.length + 1}`]);
  };
  return(
    <div className={className}>
      <h4>Bloque</h4>
      {series.map((_, index) => (
        <Serie className={`w-4/5 h-11 rounded-sm flex flex-col items-center justify-center text-white font-semibold ${colores[index % colores.length]}`}/>
      ))}
      <button
        onClick={createNewSerie}
        className="w-8 h-8 text-center flex justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md items-center hover:scale-105 transition-transform"
      >
        <PlusIcon />
      </button>
    </div>
    
  )
}

export function Serie({className}: BloqueProps){
  return(
    <div className={className}>
      serie
    </div>
  )
}