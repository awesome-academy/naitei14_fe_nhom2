import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname.includes(path);
    return `block py-2.5 px-4 rounded transition-colors duration-200 ${
      isActive
        ? "bg-green-primary text-white shadow-sm"
        : "text-gray-600 hover:bg-green-50 hover:text-green-primary dark:text-gray-300 dark:hover:bg-gray-700"
    }`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30 flex items-center justify-between px-4">
        <h2 className="text-xl font-bold text-green-primary">Admin Panel</h2>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 flex flex-col
        `}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-green-primary">Admin</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-red-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1 font-medium">
            <li>
              <Link to="dashboard" className={getLinkClass("dashboard")}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="orders" className={getLinkClass("orders")}>
                Orders
              </Link>
            </li>
            <li>
              <Link to="products" className={getLinkClass("products")}>
                Products
              </Link>
            </li>
            <li>
              <Link to="categories" className={getLinkClass("categories")}>
                Categories
              </Link>
            </li>
            <li>
              <Link to="users" className={getLinkClass("users")}>
                Users
              </Link>
            </li>
            <li>
              <Link to="request" className={getLinkClass("request")}>
                Request
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
