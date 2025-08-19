// Em: src/pages/User.tsx
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  // 1. Buscamos o usuário REAL do nosso contexto de autenticação.
  const { user } = useAuth();

  const projetos = [
    {
      id: 1,
      titulo: "Sistema de Gerenciamento Escolar",
      cargaHoraria: "120h",
      duracao: "6 meses",
      professor: "Prof. João Silva",
      tipoProjeto: "Extensão",
    },
    {
      id: 2,
      titulo: "Aplicativo de Saúde Mental",
      cargaHoraria: "100h",
      duracao: "4 meses",
      professor: "Profª. Ana Paula",
      tipoProjeto: "Pesquisa",
    },
    {
      id: 3,
      titulo: "Plataforma de Doação de Alimentos",
      cargaHoraria: "80h",
      duracao: "3 meses",
      professor: "Prof. João Silva",
      tipoProjeto: "Extensão",
    },
    {
      id: 4,
      titulo: "Plataforma de Doação de Animais",
      cargaHoraria: "80h",
      duracao: "3 meses",
      professor: "Prof. João Silva",
      tipoProjeto: "Extensão",
    },
  ];

  // 2. Adicionamos uma verificação de carregamento.
  //    Isso evita erros enquanto o contexto busca os dados do localStorage.
  if (!user) {
    return <div>Carregando informações do usuário...</div>;
  }

  // 3. A lógica if/else agora usa o 'user.tipo_usuario' que veio do login.
  if (user.tipo_usuario === "professor") {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Painel do Professor</h1>
        {/* Usamos o nome do usuário do contexto para uma mensagem personalizada */}
        <p className="mt-2">Bem-vindo(a), {user.nome}!</p>
        <Link to="/projetos/novo">
          <button className="mt-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700">
            + Cadastrar Novo Projeto
          </button>
        </Link>
        {/* Futuramente: Aqui virá a lista de projetos do professor */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Seus Projetos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projetos.map((proj) => (
            <Link to={`/dashboard/viewproject/${proj.id}`} key={proj.id}>
              <div className="border p-4 rounded-lg shadow bg-gray-100 w-full h-48 hover:shadow-lg hover:border-red-500 transition-all duration-200 cursor-pointer">
                <h3 className="text-lg font-semibold">{proj.titulo}</h3>
                <p className="text-sm text-gray-600">
                  Carga horária: {proj.cargaHoraria}
                </p>
                <p className="text-sm text-gray-600">Duração: {proj.duracao}</p>
                <p className="text-sm text-gray-600">
                  Tipo: {proj.tipoProjeto}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  } else {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Painel do Aluno</h1>
        <p className="mt-2">Bem-vindo(a), {user.nome}!</p>
        {/* Futuramente: Aqui virá a lista de candidaturas do aluno */}
        <h2 className="text-xl font-semibold mt-8 mb-4">
          Projetos cadastrados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projetos.map((proj) => (
            <Link to={`/dashboard/viewprojectstudent/${proj.id}`} key={proj.id}>
              <div className="border p-4 rounded-lg shadow bg-gray-100 w-full h-48 hover:shadow-lg hover:border-red-500 transition-all duration-200 cursor-pointer">
                <h3 className="text-lg font-semibold">{proj.titulo}</h3>
                <p className="text-sm text-gray-600">
                  Carga horária: {proj.cargaHoraria}
                </p>
                <p className="text-sm text-gray-600">Duração: {proj.duracao}</p>
                <p className="text-sm text-gray-600">
                  Tipo: {proj.tipoProjeto}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/">
          <button className="mt-8 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Ver todos os projetos disponíveis
          </button>
        </Link>
      </main>
    );
  }
}
