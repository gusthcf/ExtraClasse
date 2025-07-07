import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.svg";
import { useAuth } from "../contexts/AuthContext";

interface loginfields {
  matricula: string;
  senha: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<loginfields>();

  async function submit(data: loginfields) {
    if (data.matricula && data.senha) {
      login(); // atualiza o contexto e a sidebar reage automaticamente
      navigate("/");
    }
  }

  return (
    <main className="mt-16 flex justify-center bg-white min-h-screen">
      <form
        className="w-80 flex flex-col gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <img src={icon} alt="icon" className="w-full bg-black" />
        <label className="font-bold">Matricula:</label>
        <input
          {...register("matricula")}
          className="h-12 w-full border bg-gray-100 rounded-md p-4 shadow-sm"
          placeholder="Insira a matrícula"
        />
        <label className="font-bold">Senha:</label>
        <input
          {...register("senha")}
          className="h-12 w-full border bg-gray-100 rounded-md p-4 shadow-sm"
          placeholder="Digite a senha"
          type="password"
        />
        <div>
          <button className="mt-4 h-12 rounded-md bg-red-800 text-white w-full text-center">
            Entrar
          </button>
        </div>
      </form>
    </main>
  );
}
