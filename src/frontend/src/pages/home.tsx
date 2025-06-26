import SearchBar from '../components/Searchbar'
import { useState, useEffect } from 'react'

interface Projeto {
    id: number
    titulo: string
    cargaHoraria: string
    duracao: string
    professor: string
    tipoProjeto: string
}

export default function Home() {
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [projetos, setProjetos] = useState<Projeto[]>([])
    const itensPorPagina = 15

    useEffect(() => {
        fetch('http://localhost:8000/api/projetos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar projetos');
                }
                return response.json();
            })
            .then(data => setProjetos(data))
            .catch(err => console.error("Erro ao carregar projetos", err));
    }, []);

    const totalPaginas = Math.ceil(projetos.length / itensPorPagina)
    const inicio = (paginaAtual - 1) * itensPorPagina
    const fim = inicio + itensPorPagina
    const projetosPaginados = projetos.slice(inicio, fim)

    return (
        <main className="mt-10 flex-1 p-6 bg-white">
            <h1 className="text-2xl font-bold mb-4">Projetos Disponíveis</h1>
            <SearchBar />

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 ">
                {projetosPaginados.map((proj) => (
                    <div key={proj.id} className="border p-4 rounded-lg shadow bg-gray-100 w-80 h-48">
                        <h3 className="text-lg font-semibold">{proj.titulo}</h3>
                        <p className="text-sm text-gray-600">Carga horária: {proj.cargaHoraria}</p>
                        <p className="text-sm text-gray-600">Duração: {proj.duracao}</p>
                        <p className="text-sm text-gray-600">Professor: {proj.professor}</p>
                        <p className="text-sm text-gray-600">Tipo: {proj.tipoProjeto}</p>
                    </div>
                ))}
            </div>

            {projetos.length > itensPorPagina && (
                <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:text-red-500"
                        onClick={() => setPaginaAtual((p) => p - 1)}
                        disabled={paginaAtual === 1}
                    >
                        Anterior
                    </button>

                    <span className="text-gray-600">
                        Página {paginaAtual} de {totalPaginas}
                    </span>

                    <button
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:text-red-500"
                        onClick={() => setPaginaAtual((p) => p + 1)}
                        disabled={paginaAtual === totalPaginas}
                    >
                        Próxima
                    </button>
                </div>
            )}
        </main>
    )
}