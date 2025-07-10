import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";

import useAuth from "../hooks/useAuth/useAuth";

const DashBoardLayout = () => {
  const { user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <div className="bg-gray-100 min-h-full flex flex-col lg:flex-row">
      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between bg-[#584b45] p-4 shadow-md z-50">
        <h1 className="text-xl text-white font-bold">Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 min-h-screen bg-white shadow-lg transform transition-transform duration-200 z-40 
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0 lg:relative lg:shadow-none
    `}
      >
        <div className="p-6 h-full flex flex-col">
          <ul className="space-y-2 flex-1">
            <li>
              <NavLink
                to="/"
                onClick={closeSidebar}
                className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700 "
              >
                Back To Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/manage-applications"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded text-gray-700 ${
                    isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  }`
                }
              >
                Manage Application
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-users"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded text-gray-700 ${
                    isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  }`
                }
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-policies"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded text-gray-700 ${
                    isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  }`
                }
              >
                Manage Policies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-transactions"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded text-gray-700 ${
                    isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  }`
                }
              >
                Manage Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-agents"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded text-gray-700 ${
                    isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  }`
                }
              >
                Manage Agents
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-opacity-40 z-30 lg:hidden"
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 p-6 lg:ml-40 mt-4 lg:mt-0">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to Dashboard
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
