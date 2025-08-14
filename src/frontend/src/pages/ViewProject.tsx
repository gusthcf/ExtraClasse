import { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo2.jpeg";


export default function VielProject() {
    interface Aluno {
        id: number;
        Nome: string;
    }
    const { id } = useParams();
    const [projeto, setProjeto] = useState<Projeto | null>(null);
    const [filtro, setFiltro] = useState('');

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

    const alunosFiltrados = alunos.filter(aluno =>
        aluno.Nome.toLowerCase().startsWith(filtro.toLowerCase())
    );

    return (
        <main className="w-full h-screen">
            <div className="flex  h-full">
                <div className="w-64 bg-red-800 flex flex-col gap-8 shadow-lg">
                    <div className="flex justify-center items-center bg-white p-2">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-40 h-40 object-contain"
                        />
                    </div>

                    <div className=" ml-2 border-2 rounded-2xl border-white p-4 w-11/12 bg-red-900">
                        <input
                            type="text"
                            placeholder="Buscar aluno..."
                            className="border border-white bg-transparent px-4 py-2 rounded-lg w-full text-white placeholder-white mb-4 focus:outline-none focus:ring-2 focus:ring-white"
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                        <ul className="h-96 overflow-y-auto flex flex-col gap-1">
                            {alunosFiltrados.map(aluno => (
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
                <div className="p-6  mt-16 w-full max-w-5xl">
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        Meu Projeto
                    </h1>
                </div>
            </div>
        </main>
    )
}