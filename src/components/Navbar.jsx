import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full  text-neutral-100 z-50 border-neutral-800 bg-transparent">
      {" "}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-extrabold text-2xl tracking-wider hover:text-red-500 transition ">
            NETFLIX
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li className="hover:text-white text-neutral-400 transition duration-200 cursor-pointer">
            Home
          </li>
          <li className="hover:text-white text-neutral-400 transition duration-200 cursor-pointer">
            TV Shows
          </li>
          <li className="hover:text-white text-neutral-400 transition duration-200 cursor-pointer">
            Movies
          </li>
          <li className="hover:text-white text-neutral-400 transition duration-200 cursor-pointer">
            New & Popular
          </li>
          <li className="hover:text-white text-neutral-400 transition duration-200 cursor-pointer">
            My List
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block  border border-neutral-700 text-sm px-3 py-1 rounded focus:outline-none focus:border-red-500 bg-transparent text-red-600"
          />

          {/* Profile */}
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
            
            U
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-xl text-red-600"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black px-4 pb-4">
          <ul className="flex flex-col gap-3 text-sm">
            <li className="hover:text-gray-300 cursor-pointer">Home</li>
            <li className="hover:text-gray-300 cursor-pointer">TV Shows</li>
            <li className="hover:text-gray-300 cursor-pointer">Movies</li>
            <li className="hover:text-gray-300 cursor-pointer">
              New & Popular
            </li>
            <li className="hover:text-gray-300 cursor-pointer">My List</li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
