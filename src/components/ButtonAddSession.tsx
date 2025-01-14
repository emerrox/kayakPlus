import useEvents from "@/integration/useEvents"
import { PlusCircleIcon } from "lucide-react"
function ButtonAddSession () {
    const {createEvent} = useEvents()
    return (
        <button onClick={createEvent} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform">
           Añadir entreno <PlusCircleIcon /> 
        </button>
    )
}

export default ButtonAddSession