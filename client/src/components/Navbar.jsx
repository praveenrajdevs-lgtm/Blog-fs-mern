import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token"); // if token exists → logged in

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-zinc-900 text-white px-6 md:px-16 py-4 flex items-center justify-between shadow-lg border-b border-blue-400 shadow-2xl hover:shadow-blue-500/30">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-400">BlogHub</div>

        {/* Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <a href="/" className="hover:text-blue-400 transition">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-400 transition">
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-blue-400 transition duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4">
          {!user ? (
            <>
              <button
                onClick={handleLogin}
                className="px-4 py-2 border cursor-pointer border-blue-400 font-medium hover:bg-blue-400 hover:text-zinc-900 transition hover:scale-105 duration-200"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="px-4 py-2 bg-blue-400 text-zinc-900 font-medium hover:bg-zinc-900 cursor-pointer hover:border hover:border-blue-400 hover:text-zinc-100 transition hover:scale-105 duration-200"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-zinc-100 border border-red-700 font-medium opacity-60 hover:opacity-100 cursor-pointer transition hover:scale-105 duration-200"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
