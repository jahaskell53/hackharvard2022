import HomeButton from "../HomeButton";

export function Navbar() {
    return (
        <nav className="relative w-screen flex flex-wrap items-center justify-between py-3 bg-indigo-600 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <div className="container-fluid">
            <a className="text-xl text-white font-semibold" href="#">Lecture Capture AI</a>
            </div>
            <HomeButton />
        </div>
        </nav>
    )
}