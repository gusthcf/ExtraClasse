import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.js";
import Home from "./pages/home.jsx";
import Newproject from "./pages/Newproject.tsx";
import Login from "./pages/Login.tsx";
import User from "./pages/User.tsx";
import Myprojects from "./pages/Myprojects.tsx";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        {/* Área que muda com a rota */}
        <div className="flex-1 p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newproject" element={<Newproject />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/myprojects" element={<Myprojects />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
