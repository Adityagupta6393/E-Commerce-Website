import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

import {
  getAllCategories,
  addCategory,
  deleteCategory,
} from "../../api/categoryApi";

function Categories() {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    cName: "",
    cDescription: "",
    cStatus: "Active",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getAllCategories();

    if (res.Categories) {
      setCategories(res.Categories);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error(
        "Please select an image"
      );
    }

    const formData = new FormData();

    formData.append("cName", form.cName);
    formData.append(
      "cDescription",
      form.cDescription
    );
    formData.append(
      "cStatus",
      form.cStatus
    );
    formData.append("cImage", image);

    const res = await addCategory(formData);

    if (res.error) {
      return toast.error(res.error);
    }

    toast.success(res.success);

    setForm({
      cName: "",
      cDescription: "",
      cStatus: "Active",
    });

    setImage(null);

    loadCategories();
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this category?"
    );

    if (!ok) return;

    const res = await deleteCategory(id);

    if (res.success) {
      toast.success(res.success);
      loadCategories();
    }
  };

  return (
    <div className="space-y-8">

      {/* Add Category */}
      <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-sm">

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Add Category
        </h1>

        <p className="text-gray-500 mb-6">
          Create a new product category
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Category Name"
            value={form.cName}
            onChange={(e) =>
              setForm({
                ...form,
                cName: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Description"
            value={form.cDescription}
            onChange={(e) =>
              setForm({
                ...form,
                cDescription: e.target.value,
              })
            }
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />

          <select
            value={form.cStatus}
            onChange={(e) =>
              setForm({
                ...form,
                cStatus: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Add Category
          </button>

        </form>

      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6 border-b">
          <h2 className="text-xl font-bold">
            Categories
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full min-w-[600px]">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  Image
                </th>
                <th className="text-left">
                  Name
                </th>
                <th className="text-left">
                  Status
                </th>
                <th className="text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-t"
                >

                  <td className="p-4">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/categories/${cat.cImage}`}
                      alt={cat.cName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>

                  <td className="font-medium">
                    {cat.cName}
                  </td>

                  <td>
                    {cat.cStatus}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleDelete(cat._id)
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

        {/* Mobile */}
        <div className="md:hidden p-4 space-y-4">

          {categories.map((cat) => (
            <div
              key={cat._id}
              className="border rounded-xl p-4"
            >

              <div className="flex gap-4 items-center">

                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/categories/${cat.cImage}`}
                  alt={cat.cName}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h3 className="font-bold">
                    {cat.cName}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Status: {cat.cStatus}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  handleDelete(cat._id)
                }
                className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                <Trash2 size={16} />
                Delete Category
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Categories;