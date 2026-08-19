import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingBag,
  Users,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: Tags,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
  ];

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-gray-900 text-white px-4 py-4 flex items-center justify-between shadow">
        <h2 className="text-xl font-bold">
          Admin Panel
        </h2>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-800"
        >
          {sidebarOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <div className="flex min-h-[calc(100vh-65px)] lg:min-h-screen">

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky
            top-0
            left-0
            z-50
            h-screen
            w-64
            bg-gray-900
            text-white
            p-6
            transition-transform duration-300
            lg:translate-x-0
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              Admin Panel
            </h2>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-800 rounded"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="space-y-2">

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3
                    px-4 py-3
                    rounded-lg
                    transition
                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

          </nav>

        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;