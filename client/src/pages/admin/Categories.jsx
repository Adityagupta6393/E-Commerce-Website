import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      return toast.error("Please select an image");
    }

    const formData = new FormData();

    formData.append("cName", form.cName);
    formData.append("cDescription", form.cDescription);
    formData.append("cStatus", form.cStatus);

    // Backend expects upload.single("cImage")
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
    <div className="space-y-10">

      <div className="bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Add Category
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
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
            className="w-full border p-3 rounded"
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
            className="w-full border p-3 rounded"
          />

          <select
            value={form.cStatus}
            onChange={(e) =>
              setForm({
                ...form,
                cStatus: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
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
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Add Category
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Image</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
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
                    src={`http://localhost:5000/uploads/categories/${cat.cImage}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td>{cat.cName}</td>

                <td>{cat.cStatus}</td>

                <td>
                  <button
                    onClick={() =>
                      handleDelete(cat._id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Categories;