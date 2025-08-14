import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo2.jpeg";

interface Projeto {
  id: number;
  titulo: string;
  cargaHoraria: string;
  duracao: string;
  tipoProjeto: string;
  professor: string;
  financiador: string;
  vagasVoluntarias: number;
  vagasRemuneradas: number;
  descricao: string;
}

interface Aluno {
  id: number;
  Nome: string;
}
export default function ViewProject() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const encontrado = projetos.find((p) => p.id === Number(id));
    setProjeto(encontrado || null);
  }, [id]);

  const projetos: Projeto[] = [
    {
      id: 1,
      titulo: "Sistema de Gerenciamento Escolar",
      cargaHoraria: "40h",
      duracao: "1 mês",
      tipoProjeto: "Pesquisa",
      professor: "Dr. João Silva",
      financiador: "CNPq",
      vagasVoluntarias: 2,
      vagasRemuneradas: 1,
      descricao:
        "Projeto de pesquisa voltado ao estudo de novas tecnologias de inteligência artificial aplicadas à agricultura.",
    },
    {
      id: 2,
      titulo: "Aplicativo de Saúde Mental",
      cargaHoraria: "60h",
      duracao: "2 meses",
      tipoProjeto: "Extensão",
      professor: "Profa. Maria Souza",
      financiador: "FAPESP",
      vagasVoluntarias: 3,
      vagasRemuneradas: 2,
      descricao:
        "Projeto de extensão universitária para promover oficinas de programação em escolas públicas.",
    },
    {
      id: 3,
      titulo: "Plataforma de Doação de Alimentos",
      cargaHoraria: "80h",
      duracao: "3 meses",
      tipoProjeto: "Ensino",
      professor: "Dr. Carlos Pereira",
      financiador: "CAPES",
      vagasVoluntarias: 1,
      vagasRemuneradas: 1,
      descricao:
        "Projeto voltado à elaboração de material didático interativo para cursos de ciência de dados.",
    },
    {
      id: 4,
      titulo: "Plataforma de Doação de Animais",
      cargaHoraria: "80h",
      duracao: "3 meses",
      tipoProjeto: "Ensino",
      professor: "Dr. Carlos Pereira",
      financiador: "CAPES",
      vagasVoluntarias: 1,
      vagasRemuneradas: 1,
      descricao:
        "Projeto voltado à elaboração de material didático interativo para cursos de ciência de dados.",
    },
  ];

  const alunos: Aluno[] = [
    { id: 1, Nome: "Marcus Vinicius" },
    { id: 2, Nome: "Laura Madaleno" },
    { id: 3, Nome: "Gustavo Henrique" },
    { id: 4, Nome: "Gabriel Vilas" },
    { id: 5, Nome: "Ana Beatriz" },
    { id: 6, Nome: "Lucas Ferreira" },
    { id: 7, Nome: "Fernanda Costa" },
    { id: 8, Nome: "Rafael Oliveira" },
    { id: 9, Nome: "Juliana Andrade" },
    { id: 10, Nome: "Bruno Almeida" },
    { id: 11, Nome: "Camila Ramos" },
    { id: 12, Nome: "Eduardo Silva" },
    { id: 13, Nome: "Patrícia Moura" },
    { id: 14, Nome: "Diego Nascimento" },
    { id: 15, Nome: "Vanessa Rocha" },
    { id: 16, Nome: "Thiago Cardoso" },
  ];

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.Nome.toLowerCase().startsWith(filtro.toLowerCase())
  );

  return (
    <main className="w-full h-screen">
      <div className="flex  h-full">
        <div className="w-64 bg-red-800 flex flex-col gap-6 shadow-lg">
          <div className="flex justify-center items-center bg-white p-2">
            <img src={logo} alt="Logo" className="w-40 h-40 object-contain" />
          </div>
          <h2 className="text-white text-center text-3xl">Alunos inscritos</h2>
          <div className=" ml-2 border-2 rounded-2xl border-white p-4 w-11/12 bg-red-900">
            <input
              type="text"
              placeholder="Buscar aluno..."
              className="border border-white bg-transparent px-4 py-2 rounded-lg w-full text-white placeholder-white mb-4 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setFiltro(e.target.value)}
            />
            <ul className="h-96 overflow-y-auto flex flex-col gap-1">
              {alunosFiltrados.map((aluno) => (
                <li
                  key={aluno.id}
                  className="p-3 bg-red-700 hover:bg-red-600 rounded-lg cursor-pointer transition-all duration-200 shadow text-white text-sm font-medium"
                >
                  {aluno.Nome}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 p-6 ">
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
                    {projeto.cargaHoraria}
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
                  <p className="text-lg font-semibold">{projeto.tipoProjeto}</p>
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
                    {projeto.vagasVoluntarias}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-500 font-medium">
                    Vagas Remuneradas
                  </p>
                  <p className="text-lg font-semibold">
                    {projeto.vagasRemuneradas}
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
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                  onClick={() => {
                    // Redireciona para a página de edição
                    // navigate(`/dashboard/editproject/${projeto.id}`);
                    alert("Funcionalidade de editar ainda não implementada");
                  }}
                >
                  Editar
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                  onClick={() => {
                    // Chamada à API para deletar
                    alert("Funcionalidade de deletar ainda não implementada");
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
