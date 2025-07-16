import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";

import {
  FaUsersCog,
  FaFileAlt,
  FaExchangeAlt,
  FaUserTie,
  FaHome,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaRegHandshake,
  FaUsers,
  FaBlog,
} from "react-icons/fa";

import useCustomerRole from "../hooks/useCustomerRole";
import Loading from "../components/Loading/Loading";

const DashBoardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { role, isLoading } = useCustomerRole();

  console.log("role from DashBoard layout", role);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-gray-100 min-h-full flex flex-col lg:flex-row">
      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between bg-[#584b45] p-4 shadow-md z-40">
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
        className={`fixed top-0 left-0 w-64 min-h-screen bg-white shadow-lg transform transition-transform duration-200 z-50
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
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 transition-colors duration-200 ${
                    isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  }`
                }
              >
                <FaHome className="text-lg" />
                Back To Home
              </NavLink>
            </li>
            {/* Admin links */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manage-applications"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaFileAlt /> Manage Applications
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaUsersCog /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-policies"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaFileAlt /> Manage Policies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-transactions"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaExchangeAlt /> Manage Transactions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-agents"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaUserTie /> Manage Agents
                  </NavLink>
                </li>
              </>
            )}
            {/* Customer links */}
            {role === "customer" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-policies"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 transition ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaFileAlt className="text-lg" />
                    My Policies
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/payment-status"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 transition ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaMoneyCheckAlt className="text-lg" />
                    Payment Status
                  </NavLink>
                </li>

                {/*  <li>
                  <NavLink
                    to="/dashboard/my-payment"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 transition ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaCreditCard className="text-lg" />
                    My Payments
                  </NavLink>
                </li> */}

                <li>
                  <NavLink
                    to="/dashboard/claim-request"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 transition ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaRegHandshake className="text-lg" />
                    Claim Request Page
                  </NavLink>
                </li>
              </>
            )}
            {/* Agent Link */}
            {role === "agent" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/assigned-customers"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 transition ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaUsers className="text-lg" />
                    Assigned Customers
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-blogs"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 transition ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaBlog className="text-lg" />
                    Manage Blogs
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/policy-clearance"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded text-gray-700 transition ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <FaFileAlt className="text-lg" />
                    Policy Clearance
                  </NavLink>
                </li>
              </>
            )}
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
      <div className="max-w-7xl lg:mx-auto mt-4 lg:mt-0">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to Dashboard
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
