import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaRegUser } from "react-icons/fa";
import { FaBowlFood, FaSun, FaMoon } from "react-icons/fa6";
import { RiLoginCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PublicNavbar() {
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

  return (
    <Disclosure as="nav" className="relative bg-avocadoGreen shadow-lg">
      {({ open }) => (
        <>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Left: Logo */}
              <div className="flex items-center">
                <div className="-ml-2 mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-avocadoDarkBrown hover:bg-avocadoLightGreen/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-avocadoDarkBrown transition-transform duration-300 hover:scale-105">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                  </Disclosure.Button>
                </div>

                {/* Logo */}
                <FaBowlFood className="h-10 w-10 text-avocadoDarkBrown border-2 border-avocadoDarkBrown rounded-full p-2 bg-avocadoLightGreen shadow-md" />

                {/* Brand */}
                <div className="hidden md:flex md:ml-4 items-center">
                  <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-wide text-avocadoDarkBrown drop-shadow-md transition-transform duration-300 hover:scale-110 hover:text-avocadoCream"
                  >
                    VitalBowl
                  </Link>
                </div>
              </div>

              {/* Right: Buttons */}
              <div className="flex space-x-3">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center justify-center rounded-full bg-avocadoCream px-3 py-2 text-sm font-bold text-avocadoGreen shadow-md transition-transform duration-300 hover:scale-105 hover:bg-avocadoLightGreen"
                  title="Toggle Dark/Light Mode"
                >
                  {isDarkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
                </button>

                {/* Register */}
                <Link
                  to="/register"
                  className="inline-flex items-center gap-x-2 rounded-full bg-avocadoLightGreen px-5 py-2 text-sm font-bold text-avocadoDarkBrown shadow-md transition-transform duration-300 hover:scale-105 hover:bg-avocadoCream hover:text-avocadoDarkGreen"
                >
                  <FaRegUser className="h-5 w-5" />
                  Register
                </Link>

                {/* Login */}
                <Link
                  to="/login"
                  className="inline-flex items-center gap-x-2 rounded-full bg-avocadoCream px-5 py-2 text-sm font-bold text-avocadoGreen shadow-md transition-transform duration-300 hover:scale-105 hover:bg-avocadoLightGreen hover:text-avocadoDarkGreen"
                >
                  <RiLoginCircleLine className="h-5 w-5" />
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden bg-avocadoLightGreen text-avocadoGreen transition-all duration-500 ease-in-out">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/">
                <Disclosure.Button className="block w-full text-left py-2 pl-3 pr-4 rounded-md font-medium hover:bg-avocadoCream hover:text-avocadoDarkBrown transition duration-200">
                  VitalBowl
                </Disclosure.Button>
              </Link>
              <Link to="/register">
                <Disclosure.Button className="block w-full text-left py-2 pl-3 pr-4 rounded-md font-medium hover:bg-avocadoCream hover:text-avocadoDarkBrown transition duration-200">
                  Register
                </Disclosure.Button>
              </Link>
              <Link to="/login">
                <Disclosure.Button className="block w-full text-left py-2 pl-3 pr-4 rounded-md font-medium hover:bg-avocadoCream hover:text-avocadoDarkBrown transition duration-200">
                  Login
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
