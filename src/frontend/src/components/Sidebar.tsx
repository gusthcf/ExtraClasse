import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.svg";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { isLogged, logout } = useAuth();

  return (
    <aside className="w-40 text-white bg-red-800 h-screen flex flex-col justify-between">
      <div>
        <h1
          className="flex items-center gap-3 justify-center font-bold text-xl mb-4 mt-16 hover:opacity-60"
          onClick={() => navigate("/user")}
        >
          <img src={icon} alt="icon" className="w-10 h-10" />
        </h1>
        <ul className="space-y-8 mt-16">
          <li
            className="group text-white text-center flex flex-col items-center gap-2 justify-center hover:text-gray-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={icon1}
              alt="icon"
              className="w-8 h-8 group-hover:opacity-60 transition duration-200"
            />
            <span className="group-hover:text-gray-300 transition duration-200">
              Projetos <br /> Disponíveis
            </span>
          </li>

          {isLogged && (
            <li
              className="group text-white text-center flex flex-col items-center gap-2 justify-center hover:text-gray-400 cursor-pointer"
              onClick={() => navigate("/myprojects")}
            >
              <img
                src={icon2}
                alt="icon"
                className="w-8 h-8 group-hover:opacity-60 transition duration-200"
              />
              <span className="group-hover:text-gray-300 transition duration-200">
                Meus <br /> Projetos
              </span>
            </li>
          )}
        </ul>
      </div>

      {!isLogged ? (
        <button
          className="m-5 w-32 h-10 text-black bg-white rounded text-center"
          onClick={() => navigate("/login")}
        >
          Fazer login
        </button>
      ) : (
        <button
          className="m-5 w-32 h-10 text-white rounded text-center"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </aside>
  );
}
