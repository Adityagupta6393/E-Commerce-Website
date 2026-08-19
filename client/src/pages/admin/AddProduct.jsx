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
      return toast.error(
        "Please select exactly 2 images"
      );
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
    <div className="max-w-4xl mx-auto">

      <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-sm">

        <div className="mb-8">

          <h1 className="text-2xl sm:text-3xl font-bold">
            Add Product
          </h1>

          <p className="text-gray-500 mt-1">
            Add a new product to your store
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block font-medium mb-2">
              Product Name
            </label>

            <input
              name="pName"
              placeholder="Product Name"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              name="pDescription"
              placeholder="Description"
              rows={5}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>
              <label className="block font-medium mb-2">
                Price
              </label>

              <input
                name="pPrice"
                type="number"
                placeholder="Price"
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Quantity
              </label>

              <input
                name="pQuantity"
                type="number"
                placeholder="Quantity"
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

          </div>

          <div>
            <label className="block font-medium mb-2">
              Category
            </label>

            <select
              name="pCategory"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>
              <label className="block font-medium mb-2">
                Offer
              </label>

              <input
                name="pOffer"
                placeholder="Offer"
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Status
              </label>

              <select
                name="pStatus"
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

          <div>
            <label className="block font-medium mb-2">
              Product Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setImages([...e.target.files])
              }
              className="w-full border border-gray-300 p-3 rounded-lg"
            />

            <p className="text-sm text-gray-500 mt-2">
              Select exactly 2 images.
            </p>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;