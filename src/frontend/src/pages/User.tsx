// Em: src/pages/User.tsx

import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
// ✅ 1. Importar useState e useEffect
import { useState, useEffect } from "react";

// ✅ 2. (Opcional, mas recomendado) Definir uma interface para o tipo do projeto
interface Projeto {
  id: number;
  titulo: string;
  carga_horaria: string; // Mantendo como string, conforme seu serializer
  duracao: string;
  professor: string;
  tipo_projeto: string;
}

export default function UserDashboard() {
  const { user } = useAuth();

  // ✅ 3. Criar estados para armazenar os projetos, o status de carregamento e erros.
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Inicia como true
  const [error, setError] = useState<string | null>(null);

  // ✅ 4. Usar useEffect para buscar os dados da API quando o usuário for carregado.
  useEffect(() => {
    // Função assíncrona para buscar os projetos
    const fetchProjetos = async () => {
      // Garantir que temos um usuário antes de fazer a chamada
      if (!user) {
        return;
      }

      setIsLoading(true); // Inicia o carregamento
      setError(null);

      try {
        let url = "http://127.0.0.1:8000/api/projetos/"; // URL base da sua API

        // Se o usuário for um professor, adiciona o filtro na URL
        if (user.tipo_usuario === "professor") {
          // O encodeURIComponent é importante para nomes com espaços ou caracteres especiais
          const professorNome = encodeURIComponent(user.nome);
          url += `?professor=${professorNome}`;
        }
        // Para alunos, a URL base busca todos os projetos, o que está correto.

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            "Não foi possível buscar os projetos. Tente novamente."
          );
        }

        const data = await response.json();
        setProjetos(data); // Armazena os projetos no estado
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Finaliza o carregamento (com sucesso ou erro)
      }
    };

    fetchProjetos();
  }, [user]); // A dependência [user] faz o useEffect rodar sempre que o objeto 'user' mudar.

  // Verificação inicial do usuário (do seu código original)
  if (!user) {
    return <div>Carregando informações do usuário...</div>;
  }

  // ✅ 5. Adicionar renderização para os estados de carregamento e erro.
  if (isLoading) {
    return <div>Carregando projetos...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">Erro ao carregar projetos: {error}</div>
    );
  }

  // Lógica de renderização principal (seu código original, agora usando o estado 'projetos')
  if (user.tipo_usuario === "professor") {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Painel do Professor</h1>
        <p className="mt-2">Bem-vindo(a), {user.nome}!</p>
        <Link to="/projetos/novo">
          <button className="mt-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700">
            + Cadastrar Novo Projeto
          </button>
        </Link>

        <h2 className="text-xl font-semibold mt-8 mb-4">Seus Projetos</h2>

        {/* Renderização condicional se não houver projetos */}
        {projetos.length === 0 ? (
          <p>Você ainda não cadastrou nenhum projeto.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* O map agora usa a variável de estado 'projetos' */}
            {projetos.map((proj) => (
              <Link to={`/dashboard/viewproject/${proj.id}`} key={proj.id}>
                <div className="border p-4 rounded-lg shadow bg-gray-100 w-full h-48 hover:shadow-lg hover:border-red-500 transition-all duration-200 cursor-pointer">
                  <h3 className="text-lg font-semibold">{proj.titulo}</h3>
                  <p className="text-sm text-gray-600">
                    Carga horária: {proj.carga_horaria}
                  </p>
                  <p className="text-sm text-gray-600">
                    Duração: {proj.duracao}
                  </p>
                  <p className="text-sm text-gray-600">
                    Tipo: {proj.tipo_projeto}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    );
  } else {
    // Painel do Aluno (também usa os projetos buscados)
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Painel do Aluno</h1>
        <p className="mt-2">Bem-vindo(a), {user.nome}!</p>
        <h2 className="text-xl font-semibold mt-8 mb-4">
          Projetos Disponíveis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projetos.map((proj) => (
            // Note que o campo no frontend era 'tipoProjeto' e no backend é 'tipo_projeto'. Ajustado aqui.
            <Link to={`/dashboard/viewprojectstudent/${proj.id}`} key={proj.id}>
              <div className="border p-4 rounded-lg shadow bg-gray-100 w-full h-48 hover:shadow-lg hover:border-red-500 transition-all duration-200 cursor-pointer">
                <h3 className="text-lg font-semibold">{proj.titulo}</h3>
                <p className="text-sm text-gray-600">
                  Carga horária: {proj.carga_horaria}
                </p>
                <p className="text-sm text-gray-600">Duração: {proj.duracao}</p>
                <p className="text-sm text-gray-600">
                  Tipo: {proj.tipo_projeto}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {/* Este botão pode ser removido ou levar a uma página com mais filtros,
            já que todos os projetos já são mostrados aqui. */}
      </main>
    );
  }
}
