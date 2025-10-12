import { IoLogOutOutline } from "react-icons/io5";
import { FaSun, FaMoon } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/slice/authSlice";
import { useState, useEffect } from "react";
import logoImage from "../../images/logo 1.png";

export default function PrivateNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const logoutHandler = () => {
    dispatch(logoutAction());
    navigate("/login"); // redirect to login page
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Add Goal", href: "/add-goal" },
    { name: "Goal List", href: "/goals" },
    { name: "Add Meal", href: "/add-meal" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 shadow-lg border-r flex flex-col bg-[#E6E2C3] border-[#B4C99C] animate-fadeIn">
      {/* Logo */}
      <div className="flex items-center justify-center p-4 border-b border-[#B4C99C]">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <img
            src={logoImage}
            alt="VitalBowl Logo"
            className="h-14 w-14 p-2 bg-[#E6E2C3] object-contain"
          />
          <span className="text-xl font-extrabold text-[#3B2F2F] drop-shadow-md">
            VitalBowl
          </span>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4 py-6 flex flex-col justify-center items-center space-y-2">
        {navItems.map((item, i) => (
          <Link
            key={item.name}
            to={item.href}
            className="block w-full text-center px-4 py-3 rounded-lg text-sm font-semibold text-[#3B4D1F] shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#A3C15D] hover:text-[#3B2F2F] animate-slideInUp"
            style={{ animationDelay: `${0.1 * i}s` }}
          >
            {item.name}
          </Link>
        ))}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="block w-full text-center px-4 py-3 rounded-lg text-sm font-semibold text-[#3B4D1F] shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#A3C15D] hover:text-[#3B2F2F] animate-slideInUp"
          style={{ animationDelay: "0.5s" }}
          title="Toggle Dark/Light Mode"
        >
          {isDarkMode ? (
            <FaSun className="mx-auto h-5 w-5" />
          ) : (
            <FaMoon className="mx-auto h-5 w-5" />
          )}
          <span className="mt-1 block text-xs">Theme</span>
        </button>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#B4C99C]">
        <button
          onClick={logoutHandler}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-[#E6E2C3] bg-[#3B4D1F] shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#7BA23F] hover:text-[#3B2F2F]"
        >
          <IoLogOutOutline className="h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  );
}
