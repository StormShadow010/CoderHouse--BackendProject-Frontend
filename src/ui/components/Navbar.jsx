export const Navbar = () => {
  return (
    <header className="sticky top-0 bg-white shadow-lg z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          <a href="#">Logo</a>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Inicio
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Servicios
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Contacto
          </a>
        </div>
        <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};
