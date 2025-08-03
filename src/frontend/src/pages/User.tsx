// Em: src/pages/User.tsx
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  // 1. Buscamos o usuário REAL do nosso contexto de autenticação.
  const { user } = useAuth();

  // 2. Adicionamos uma verificação de carregamento.
  //    Isso evita erros enquanto o contexto busca os dados do localStorage.
  if (!user) {
    return <div>Carregando informações do usuário...</div>;
  }

  // 3. A lógica if/else agora usa o 'user.tipo_usuario' que veio do login.
  if (user.tipo_usuario === 'professor') {
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
      </main>
    );
  } else {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Painel do Aluno</h1>
        <p className="mt-2">Bem-vindo(a), {user.nome}!</p>
        {/* Futuramente: Aqui virá a lista de candidaturas do aluno */}
        <Link to="/">
          <button className="mt-8 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Ver todos os projetos disponíveis
          </button>
        </Link>
      </main>
    );
  }
}
