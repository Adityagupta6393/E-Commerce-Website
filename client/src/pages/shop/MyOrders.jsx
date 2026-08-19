import { useEffect, useState } from "react";
import { Package, CalendarDays } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getOrdersByUser } from "../../api/orderApi";

function MyOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const res = await getOrdersByUser(user._id);

      if (res.Order) {
        setOrders(res.Order);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-gray-500">
          Loading orders...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">

        <div className="text-center">

          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <Package size={32} />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold">
            No Orders Found
          </h1>

          <p className="text-gray-500 mt-2">
            You haven't placed any orders yet.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">

      {/* Heading */}
      <div className="mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          My Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Track and manage your orders
        </p>

      </div>

      <div className="space-y-5 sm:space-y-8">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-sm rounded-xl p-4 sm:p-6"
          >

            {/* Order Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-5">

              <div className="min-w-0">

                <h2 className="font-bold">
                  Order ID
                </h2>

                <p className="text-sm text-gray-500 break-all mt-1">
                  {order._id}
                </p>

                {order.createdAt && (
                  <p className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                    <CalendarDays size={15} />

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                )}

              </div>

              <span
                className={`self-start px-3 sm:px-4 py-2 rounded-full text-sm font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.status}
              </span>

            </div>

            {/* Products */}
            <div className="space-y-4">

              {order.allProduct.map((product) => (
                <div
                  key={product.id?._id}
                  className="flex gap-3 sm:gap-5 border-b pb-4"
                >

                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/products/${product.id?.pImages?.[0]}`}
                    alt={product.id?.pName}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0"
                  />

                  <div className="flex-1 min-w-0">

                    <h3 className="font-bold text-sm sm:text-base truncate">
                      {product.id?.pName}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Quantity: {product.quantity}
                    </p>

                    <p className="font-semibold mt-1">
                      ₹{product.id?.pPrice}
                    </p>

                  </div>

                </div>
              ))}

            </div>

            {/* Total */}
            <div className="mt-5 flex justify-between items-center gap-4 font-bold text-base sm:text-lg">

              <span>
                Total Amount
              </span>

              <span className="text-blue-600">
                ₹{order.amount}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default MyOrders;