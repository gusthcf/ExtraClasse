import { useParams } from "react-router-dom";
import icon from "../assets/icon.svg";

interface Aluno {
  id: number;
  Nome: string;
  Matricula: string;
  Email: string;
  Coeficiente: string;
  Curso: string;
}

export default function StudentInfo() {
  const { id } = useParams<{ id: string }>(); // pega o id da URL
  const alunoId = Number(id);

  const alunos: Aluno[] = [
    {
      id: 1,
      Nome: "Marcus Vinicius",
      Matricula: "2021001",
      Email: "marcus.vinicius@universidade.edu",
      Coeficiente: "8.5",
      Curso: "Engenharia de Software",
    },
    {
      id: 2,
      Nome: "Laura Madaleno",
      Matricula: "2021002",
      Email: "laura.madaleno@universidade.edu",
      Coeficiente: "9.1",
      Curso: "Direito",
    },
    {
      id: 3,
      Nome: "Gustavo Henrique",
      Matricula: "2021003",
      Email: "gustavo.henrique@universidade.edu",
      Coeficiente: "7.8",
      Curso: "Ciência da Computação",
    },
    {
      id: 4,
      Nome: "Gabriel Vilas",
      Matricula: "2021004",
      Email: "gabriel.vilas@universidade.edu",
      Coeficiente: "8.0",
      Curso: "Engenharia Civil",
    },
    {
      id: 5,
      Nome: "Ana Beatriz",
      Matricula: "2021005",
      Email: "ana.beatriz@universidade.edu",
      Coeficiente: "9.3",
      Curso: "Medicina",
    },
    {
      id: 6,
      Nome: "Lucas Ferreira",
      Matricula: "2021006",
      Email: "lucas.ferreira@universidade.edu",
      Coeficiente: "7.5",
      Curso: "Administração",
    },
    {
      id: 7,
      Nome: "Fernanda Costa",
      Matricula: "2021007",
      Email: "fernanda.costa@universidade.edu",
      Coeficiente: "8.7",
      Curso: "Arquitetura",
    },
  ];

  const aluno = alunos.find((a) => a.id === alunoId);

  if (!aluno) {
    return <p className="text-center mt-16">Aluno não encontrado.</p>;
  }

  return (
    <main className=" flex justify-center bg-white min-h-screen">
      <div className="max-w-4xl w-full p-6 bg-white border">
        {/* Avatar/Icone do aluno */}
        <div className="flex justify-center items-center mb-8 mt-16">
          <img
            src={icon}
            alt="aluno"
            className="w-40 h-40 rounded-full shadow bg-gray-500 object-cover"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-500 font-medium">Nome</p>
            <p className="text-lg font-semibold">{aluno.Nome}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-500 font-medium">Matrícula</p>
            <p className="text-lg font-semibold">{aluno.Matricula}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-500 font-medium">Email</p>
            <p className="text-lg font-semibold">{aluno.Email}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-500 font-medium">Curso</p>
            <p className="text-lg font-semibold">{aluno.Curso}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-500 font-medium">Coeficiente</p>
            <p className="text-lg font-semibold">{aluno.Coeficiente}</p>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          {/* Botão Voltar */}
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Voltar
          </button>

          {/* Botão Aprovar Aluno */}
          <button
            onClick={() => alert(`Aluno ${aluno.Nome} aprovado!`)} // exemplo de ação
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Aprovar Aluno
          </button>
        </div>
      </div>
    </main>
  );
}
