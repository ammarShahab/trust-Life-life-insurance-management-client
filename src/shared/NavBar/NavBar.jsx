import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { LuMoon, LuSun } from "react-icons/lu";
import TrustLife from "../TrustLife/TrustLife";
import useAuth from "../../hooks/useAuth/useAuth";
import LogoutButton from "../LogoutButton/LogoutButton";

const NavBar = () => {
  const { user, logOut, setUser, theme, setTheme } = useAuth();
  // const [theme, setTheme] = useState("");
  console.log("user from Navbar ", user?.email);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        toast.success("Successfully Logged Out");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isOpen, setIsOpen] = useState(false);
  // assuming it returns { user: {...} }

  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "All Policies", path: "/all-policies" },
    { name: "Agents", path: "/agents" },
    { name: "FAQs", path: "/faq" },
  ];

  const privateLinks = [
    { name: "My Bookings", path: "/my-bookings" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <TrustLife></TrustLife>
          </NavLink>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-white focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-6">
            {publicLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-200"
                    } hover:text-blue-600 dark:hover:text-blue-400 transition`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {user &&
              privateLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-sm font-medium ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-200"
                      } hover:text-blue-600 dark:hover:text-blue-400 transition`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/auth/login"
                    className="text-white bg-[#baa53a] hover:bg-[#fcd547] font-medium rounded-lg 
                               text-sm px-5 py-2.5 transition"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/auth/register"
                    className="text-white bg-[#1f2936] hover:bg-[#374151] font-medium rounded-lg 
                               text-sm px-5 py-2.5 transition"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-white bg-[#1f2936] hover:bg-[#374151] font-medium rounded-lg 
                             text-sm px-5 py-2.5 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-3 space-y-2">
            {[...publicLinks, ...(user ? privateLinks : [])].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-md text-sm font-medium ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-200"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 transition`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {!user ? (
              <>
                <NavLink
                  to="/auth/login"
                  className="block w-full text-center py-2 px-4 text-white bg-[#baa53a] hover:bg-[#fcd547] 
                             rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="block w-full text-center py-2 px-4 text-white bg-[#1f2936] hover:bg-[#374151] 
                             rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogOut();
                  setIsOpen(false);
                }}
                className="block w-full text-center py-2 px-4 text-white bg-[#1f2936] hover:bg-[#374151] 
                           rounded-lg transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
