import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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

            <div className="flex justify-between mb-8">

                <h1 className="text-3xl font-bold">
                    Products
                </h1>

                <Link
                    to="/admin/products/add"
                    className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                    Add Product
                </Link>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
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
                                        src={`http://localhost:5000/uploads/products/${item.pImages?.[0]}`}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>

                                <td>{item.pName}</td>

                                <td>₹{item.pPrice}</td>

                                <td>{item.pQuantity}</td>

                                <td>{item.pStatus}</td>

                                <td>
                                    <button
                                        onClick={() =>
                                            handleDelete(item._id)
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

export default Products;