import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.jpeg";
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
      // --- INÍCIO DA CORREÇÃO ---

      // 1. Criamos um objeto de usuário "mock" para o teste.
      //    No futuro, esses dados virão da sua API de backend.
      const mockUserData = {
        id: 1,
        matricula: data.matricula,
        nome: "Robson", // Pode ser qualquer nome
        tipo_usuario: "professor" as const, // Mude para 'professor' para testar a outra visão
      };

      // 2. Chamamos o login PASSANDO o argumento esperado.
      login(mockUserData);

      // --- FIM DA CORREÇÃO ---

      navigate("/dashboard");
    }
  }

  return (
    <main className="mt-16 flex justify-center bg-white min-h-screen">
      <form
        className="w-80 flex flex-col gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex justify-center items-center">
          <img src={logo} alt="icon" className="w-72 h-72 bg-black" />
        </div>
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
