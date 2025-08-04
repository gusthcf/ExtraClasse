import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; 
import Home from "./pages/home";
import ProjDisp from "./pages/projetosdisponiveis"; 
import Newproject from "./pages/Newproject"; 
import Login from "./pages/Login"; 
import UserDashboard from "./pages/User"; 
import Myprojects from "./pages/Myprojects";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 p-4 overflow-auto bg-white min-h-screen">
          <Routes>
            {/* --- Rotas Públicas --- */}
            <Route path="/" element={<Home />} />
            <Route path="/projetos-disponiveis" element={<ProjDisp />} />
            <Route path="/login" element={<Login />} />

            {/* --- Rotas Protegidas --- */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/projetos/novo" element={<Newproject />} />
              <Route path="/meus-projetos" element={<Myprojects />} />
            </Route>

          </Routes>
        </div>
      </div>
    </Router>
  );
}