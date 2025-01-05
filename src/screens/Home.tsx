import Calendar from "../components/Fullcalendar";
import useGroups from "@/integration/useGroups";
import Sidebar from "@/layout/Sidebar";
import MainLayout from "@/layout/MainLayout";


const Home: React.FC = () => {
  const { getGroups } = useGroups();

  return (
  <Sidebar>
    <MainLayout>
    <div className="flex flex-col items-center gap-12 w-full p-5" >
      <h2 className="text-2xl font-bold text-center text-textPrimary">Bienvenido a Home</h2>
      <Calendar />

      <button
        onClick={getGroups}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
      >
        mostrar grupos
      </button>
    </div>
    </MainLayout>
    </Sidebar>
  );
};

export default Home;
