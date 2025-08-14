import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas e Componentes
import Home from "./pages/home";
import ProjDisp from "./pages/Projetosdisponiveis";
import Newproject from "./pages/Newproject";
import Login from "./pages/Login";
import UserDashboard from "./pages/User";
import Myprojects from "./pages/Myprojects";
import ProjetoCadastro from "./pages/ProjetoCadastro";
import VielProject from "./pages/ViewProject";

// Componentes de Rota
import { ProtectedRoute } from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout"; // ✨ 1. Importe o novo layout

export default function App() {
  return (
    <Router>
      {/* 2. Remova a Sidebar e o div daqui. O Router agora é o elemento raiz. */}
      <Routes>
        {/* --- Rotas Públicas (sem Sidebar) --- */}
        <Route element={<ProtectedLayout />}> 
          <Route path="/" element={<Home />} /> 
          <Route path="/projetos-disponiveis" element={<ProjDisp />} />
          <Route path="/projeto/:id" element={<ProjetoCadastro />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
        

        {/* --- Rotas Protegidas (COM Sidebar) --- */}
        {/* 3. Agrupe as rotas protegidas dentro do ProtectedLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/projetos/novo" element={<Newproject />} />
            <Route path="/meus-projetos" element={<Myprojects />} />
          </Route>
          <Route path="/dashboard/viewproject/:id" element={<VielProject />} />
        </Route>
      </Routes>
    </Router>
  );
}