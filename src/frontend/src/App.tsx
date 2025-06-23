import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';
import Home from './pages/home.jsx';
import Newproject from './pages/Newproject.tsx';

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}