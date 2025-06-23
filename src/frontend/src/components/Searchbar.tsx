export default function SearchBar() {
    return (
        <div className="flex items-center gap-2 bg-white rounded-2xl">
            <input
                type="text"
                placeholder="Hinted search text"
                className="border px-4 py-2 rounded"
            />
            <button className="px-3 py-1 border rounded-full bg-red-800 text-white hover:text-white">Iniciação Científica</button>
            <button className="px-3 py-1 border rounded-full bg-red-800 text-white">Monitoria</button>
            <button className="px-3 py-1 border rounded-full bg-red-800 text-white">Tutoria</button>
            <button className="px-3 py-1 border rounded-full bg-red-800 text-white">Projeto de Extensão</button>
        </div>
    )
}