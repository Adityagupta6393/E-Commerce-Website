import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../../api/orderApi";

const orderStatuses = [
  "Not Processed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await getAllOrders();

    if (res.Orders) {
      setOrders(res.Orders);
    }
  };

  const handleStatusChange = async (oId, status) => {
    const res = await updateOrder(oId, status);

    if (res.success) {
      toast.success(res.success);
      loadOrders();
    }
  };

  const handleDelete = async (oId) => {
    if (!window.confirm("Delete this order?")) return;

    const res = await deleteOrder(oId);

    if (res.success) {
      toast.success(res.success);
      loadOrders();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold">
                  Order ID: {order._id}
                </p>

                <p>
                  Customer: {order.user?.name}
                </p>

                <p>
                  Email: {order.user?.email}
                </p>

                <p>
                  Amount: ₹{order.amount}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order._id,
                      e.target.value
                    )
                  }
                  className="border p-2 rounded"
                >
                  {orderStatuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() =>
                    handleDelete(order._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              {order.allProduct.map((item) => (
                <div
                  key={item.id?._id}
                  className="flex items-center gap-4 mb-3"
                >
                  <img
                    src={`http://localhost:5000/uploads/products/${item.id?.pImages?.[0]}`}
                    className="w-16 h-16 object-cover rounded"
                    alt=""
                  />

                  <div>
                    <h3 className="font-semibold">
                      {item.id?.pName}
                    </h3>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <p>
                      ₹{item.id?.pPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Address: {order.address}
              <br />
              Phone: {order.phone}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;