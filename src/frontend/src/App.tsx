import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; 
import Home from "./pages/home"; 
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

        {/* Área que muda com a rota */}
        <div className="flex-1 p-4 overflow-auto">
          <Routes>
            {/* --- Rotas Públicas --- */}
            <Route path="/" element={<Home />} />
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