import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home from './screens/Home';
import Landing from './screens/Landing';
import Group from './screens/Group';
import Sidebar from "@/layout/Sidebar";
import MainLayout from '@/layout/MainLayout';

function App() {
  return (
    <div className="font-geist m-0 p-0 w-full flex flex-col items-center justify-around min-h-screen px-5 overflow-auto bg-backgroundColor text-textPrimary">
      <Router>
        <MainLayout >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Sidebar><Home /></Sidebar> } />
          <Route path="/group/*" element={<Sidebar><Group  /></Sidebar>} />
        </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
