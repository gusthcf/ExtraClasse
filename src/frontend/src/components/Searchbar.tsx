export default function SearchBar() {
    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Hinted search text"
                className="border px-4 py-2 rounded"
            />
            <button className="px-3 py-1 border rounded-full">Iniciação Científica</button>
            <button className="px-3 py-1 border rounded-full">Monitoria</button>
            <button className="px-3 py-1 border rounded-full">Tutoria</button>
            <button className="px-3 py-1 border rounded-full">Projeto de Extensão</button>
        </div>
    )
}