import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useState } from "react"; 

interface loginfields {
  matricula: string;
  senha: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<loginfields>();
  const [error, setError] = useState<string | null>(null); // 3. Estado para guardar a mensagem de erro

  // 4. Substitua toda a sua função 'submit' por esta
  async function submit(data: loginfields) {
    setError(null); // Limpa erros anteriores
    try {
      // O endereço da sua API Django. Ajuste se for diferente.
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        matricula: data.matricula,
        senha: data.senha,
      });

      // O backend retornou sucesso (status 200)
      // A resposta (response.data) contém os dados do usuário
      // Ex: { id: 1, username: '123456', first_name: '', tipo_usuario: 'aluno' }
      const userData = {
        id: response.data.id,
        matricula: response.data.username, // Lembre-se que usamos username como matrícula
        nome: response.data.first_name || "Usuário", // Use o nome ou um padrão
        tipo_usuario: response.data.tipo_usuario,
      };

      login(userData); // Chama a função do AuthContext com os dados reais

      navigate("/dashboard"); // Redireciona para a página principal

    } catch (err: any) {
      // Se o axios der erro (ex: backend retornou 401 Unauthorized)
      console.error("Erro no login:", err);
      setError("Matrícula ou senha inválida. Tente novamente.");
    }
  }

  return (
    <main className="mt-16 flex justify-center bg-white min-h-screen">
      <form
        className="w-80 flex flex-col gap-4"
        onSubmit={handleSubmit(submit)}
      >
        {/* ... o resto do seu formulário continua igual ... */}
        {/* Adicione este bloco para mostrar a mensagem de erro */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
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