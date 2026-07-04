import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { addProduct } from "../../api/productApi";
import { getAllCategories } from "../../api/categoryApi";

function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    pName: "",
    pDescription: "",
    pPrice: "",
    pQuantity: "",
    pCategory: "",
    pOffer: "0",
    pStatus: "Active",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getAllCategories();

    if (res.Categories) {
      setCategories(res.Categories);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length !== 2) {
      return toast.error("Please select exactly 2 images");
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await addProduct(formData);

    if (res.error) {
      return toast.error(res.error);
    }

    toast.success(res.success);

    navigate("/admin/products");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-8">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          name="pName"
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="pDescription"
          placeholder="Description"
          rows={5}
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="pPrice"
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="pQuantity"
          type="number"
          placeholder="Quantity"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="pCategory"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        >
          <option value="">
            Select Category
          </option>

          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {cat.cName}
            </option>
          ))}
        </select>

        <input
          name="pOffer"
          placeholder="Offer"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="pStatus"
          className="w-full border p-3 rounded"
          onChange={handleChange}
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
          multiple
          accept="image/*"
          onChange={(e) =>
            setImages([...e.target.files])
          }
        />

        <button
          className="bg-blue-600 text-white px-8 py-3 rounded"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;