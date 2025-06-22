import icon from '../assets/icon.svg'
import icon1 from '../assets/icon1.svg'
import icon2 from '../assets/icon2.svg'

export default function Sidebar() {
    return (
        <aside className="w-40 p-4 text-white bg-gray-300 opacity-75 rounded">
            <h1 className="flex items-center gap-3 justify-center font-bold text-xl mb-4 mt-16">
                <img src={icon} alt="icon" className="w-10 h-10" />
            </h1>
            <ul className="space-y-8 mt-16">
                <li className="text-gray-600 text-center flex flex-col items-center gap-2 justify-center">
                    <img src={icon1} alt="icon" className="w-8 h-8" />
                    Projetos <br /> Disponíveis
                </li>
                <li className="text-gray-600 text-center flex flex-col items-center gap-2 justify-center">
                    <img src={icon2} alt="icon" className="w-8 h-8" />
                    Meus <br /> Projetos
                </li>
            </ul>
        </aside>

    )
}