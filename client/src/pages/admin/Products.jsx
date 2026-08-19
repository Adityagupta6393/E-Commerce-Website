import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Trash2, Plus } from "lucide-react";

import {
  getAllProducts,
  deleteProduct,
} from "../../api/productApi";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getAllProducts();

    if (res.Products) {
      setProducts(res.Products);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this product?"
    );

    if (!ok) return;

    const res = await deleteProduct(id);

    if (res.success) {
      toast.success(res.success);
      loadProducts();
    }
  };

  return (
    <div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your products
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
        >
          <Plus size={18} />
          Add Product
        </Link>

      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="text-left">Name</th>
              <th className="text-left">Price</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {products.map((item) => (
              <tr
                key={item._id}
                className="border-t"
              >

                <td className="p-4">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/products/${item.pImages?.[0]}`}
                    alt={item.pName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>

                <td className="font-medium">
                  {item.pName}
                </td>

                <td>
                  ₹{item.pPrice}
                </td>

                <td>
                  {item.pQuantity}
                </td>

                <td>
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                    {item.pStatus}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">

        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-sm p-4"
          >

            <div className="flex gap-4">

              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/products/${item.pImages?.[0]}`}
                alt={item.pName}
                className="w-20 h-20 object-cover rounded-lg shrink-0"
              />

              <div className="min-w-0 flex-1">

                <h2 className="font-bold truncate">
                  {item.pName}
                </h2>

                <p className="text-green-600 font-semibold mt-1">
                  ₹{item.pPrice}
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Quantity: {item.pQuantity}
                </p>

                <p className="text-gray-500 text-sm">
                  Status: {item.pStatus}
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                handleDelete(item._id)
              }
              className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              <Trash2 size={16} />
              Delete Product
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Products;