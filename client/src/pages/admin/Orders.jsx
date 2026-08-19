import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

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

  const handleStatusChange = async (
    oId,
    status
  ) => {
    const res = await updateOrder(oId, status);

    if (res.success) {
      toast.success(res.success);
      loadOrders();
    }
  };

  const handleDelete = async (oId) => {
    if (
      !window.confirm(
        "Delete this order?"
      )
    ) {
      return;
    }

    const res = await deleteOrder(oId);

    if (res.success) {
      toast.success(res.success);
      loadOrders();
    }
  };

  return (
    <div>

      <div className="mb-8">

        <h1 className="text-2xl sm:text-3xl font-bold">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage customer orders
        </p>

      </div>

      <div className="space-y-5">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
          >

            {/* Order Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">

              <div className="min-w-0">

                <p className="font-bold break-all">
                  Order ID:
                  <span className="font-normal ml-1">
                    {order._id}
                  </span>
                </p>

                <p className="mt-2">
                  <span className="font-semibold">
                    Customer:
                  </span>{" "}
                  {order.user?.name}
                </p>

                <p className="break-all">
                  <span className="font-semibold">
                    Email:
                  </span>{" "}
                  {order.user?.email}
                </p>

                <p>
                  <span className="font-semibold">
                    Amount:
                  </span>{" "}
                  ₹{order.amount}
                </p>

              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order._id,
                      e.target.value
                    )
                  }
                  className="border border-gray-300 p-3 rounded-lg w-full sm:w-auto"
                >
                  {orderStatuses.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    )
                  )}
                </select>

                <button
                  onClick={() =>
                    handleDelete(
                      order._id
                    )
                  }
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>

            {/* Products */}
            <div className="border-t mt-5 pt-5 space-y-4">

              {order.allProduct.map(
                (item) => (
                  <div
                    key={item.id?._id}
                    className="flex gap-4 items-center"
                  >

                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/products/${item.id?.pImages?.[0]}`}
                      alt={item.id?.pName}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0"
                    />

                    <div className="min-w-0">

                      <h3 className="font-semibold truncate">
                        {item.id?.pName}
                      </h3>

                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm font-semibold">
                        ₹{item.id?.pPrice}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

            {/* Address */}
            <div className="border-t mt-5 pt-5 text-sm text-gray-600 leading-6">

              <p>
                <span className="font-semibold text-gray-800">
                  Address:
                </span>{" "}
                {order.address}
              </p>

              <p>
                <span className="font-semibold text-gray-800">
                  Phone:
                </span>{" "}
                {order.phone}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Orders;