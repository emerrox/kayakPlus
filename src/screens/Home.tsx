import ButtonAddSession from "@/components/ButtonAddSession";
import Calendar from "../components/Fullcalendar";
import {isMobile} from 'react-device-detect';

const Home: React.FC = () => {
  return (
    <>
    <div className="flex flex-col items-center gap-12 w-full h-fit min-h-96 p-5" >
      <h2 className="text-2xl font-bold text-center text-textPrimary">Bienvenido a Home</h2>
      {isMobile ?<div className="w-full h-96 bg-white rounded-lg shadow-md">card</div>: <Calendar /> }
      <ButtonAddSession/>
    </div>
    </>
  );
};

export default Home;
