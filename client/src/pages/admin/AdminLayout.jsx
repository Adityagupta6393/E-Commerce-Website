import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen flex">

      <aside className="w-64 bg-gray-900 text-white p-6">

        <h2 className="text-2xl font-bold mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-4">

          <Link
            to="/admin"
            className="block hover:text-blue-400"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="block hover:text-blue-400"
          >
            Products
          </Link>

          <Link
            to="/admin/categories"
            className="block hover:text-blue-400"
          >
            Categories
          </Link>

          <Link
            to="/admin/orders"
            className="block hover:text-blue-400"
          >
            Orders
          </Link>

          <Link
            to="/admin/users"
            className="block hover:text-blue-400"
          >
            Users
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;