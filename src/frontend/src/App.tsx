import Sidebar from './components/Sidebar.js';
import Home from './pages/Home.js'

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Home />
    </div>
  )
}
