import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../assets/logo2.jpeg";

interface Projeto {
  id: number;
  titulo: string;
  carga_horaria: string;
  duracao: string;
  tipo_projeto: string;
  professor: string;
  financiador: string;
  vagas_voluntarias: number;
  vagas_remuneradas: number;
  descricao: string;
}

interface Aluno {
  id: number;
  Nome: string;
}

export default function ViewProject() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8000/projetos/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar projeto");
        return res.json();
      })
      .then((data) => setProjeto(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const alunos: Aluno[] = [
    { id: 1, Nome: "Marcus Vinicius" },
    { id: 2, Nome: "Laura Madaleno" },
    { id: 3, Nome: "Gustavo Henrique" },
    { id: 4, Nome: "Gabriel Vilas" },
    { id: 5, Nome: "Ana Beatriz" },
    { id: 6, Nome: "Lucas Ferreira" },
    { id: 7, Nome: "Fernanda Costa" },
  ];

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.Nome.toLowerCase().startsWith(filtro.toLowerCase())
  );

  if (loading) return <p>Carregando...</p>;

  return (
    <main className="w-full h-screen">
      <div className="flex h-full">
        {/* Sidebar alunos */}
        <div className="w-64 bg-red-800 flex flex-col gap-6 shadow-lg">
          <div className="flex justify-center items-center bg-white p-2">
            <img src={logo} alt="Logo" className="w-40 h-40 object-contain" />
          </div>
          <h2 className="text-white text-center text-3xl">Alunos inscritos</h2>
          <div className="ml-2 border-2 rounded-2xl border-white p-4 w-11/12 bg-red-900">
            <input
              type="text"
              placeholder="Buscar aluno..."
              className="border border-white bg-transparent px-4 py-2 rounded-lg w-full text-white placeholder-white mb-4 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setFiltro(e.target.value)}
            />
            <ul className="h-96 overflow-y-auto flex flex-col gap-1">
              {alunosFiltrados.map((aluno) => (
                <Link to={`/dashboard/studentinfo/${aluno.id}`} key={aluno.id}>
                  <li className="p-3 bg-red-700 hover:bg-red-600 rounded-lg cursor-pointer transition-all duration-200 shadow text-white text-sm font-medium">
                    {aluno.Nome}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 p-6">
          {projeto ? (
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 border border-gray-300 h-full">
              <h1 className="text-3xl font-bold mb-4 text-red-800 text-center">
                {projeto.titulo}
              </h1>

              {/* Grid com informações principais */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-500 font-medium">
                    Carga Horária
                  </p>
                  <p className="text-lg font-semibold">
                    {projeto.carga_horaria}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-500 font-medium">Duração</p>
                  <p className="text-lg font-semibold">{projeto.duracao}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-500 font-medium">
                    Tipo de Projeto
                  </p>
                  <p className="text-lg font-semibold">
                    {projeto.tipo_projeto}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-500 font-medium">Professor</p>
                  <p className="text-lg font-semibold">{projeto.professor}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-500 font-medium">
                    Financiador
                  </p>
                  <p className="text-lg font-semibold">{projeto.financiador}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-500 font-medium">
                    Vagas Voluntárias
                  </p>
                  <p className="text-lg font-semibold">
                    {projeto.vagas_voluntarias}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-500 font-medium">
                    Vagas Remuneradas
                  </p>
                  <p className="text-lg font-semibold">
                    {projeto.vagas_remuneradas}
                  </p>
                </div>
              </div>

              {/* Descrição */}
              <div className="mt-6">
                <p className="text-sm text-gray-500 font-medium">Descrição</p>
                <p className="text-base text-gray-700">{projeto.descricao}</p>
              </div>

              <div className="mt-80 flex gap-4 justify-end">
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                >
                  Voltar
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                  onClick={() => {
                    fetch(`http://localhost:8000/projetos/${id}/`, {
                      method: "DELETE",
                    })
                      .then((res) => {
                        if (res.ok) {
                          alert("Projeto deletado com sucesso!");
                          window.history.back();
                        } else {
                          alert("Erro ao deletar projeto");
                        }
                      })
                      .catch((err) => console.error(err));
                  }}
                >
                  Deletar
                </button>
              </div>
            </div>
          ) : (
            <p>Projeto não encontrado.</p>
          )}
        </div>
      </div>
    </main>
  );
}
