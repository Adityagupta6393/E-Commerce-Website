import { useEffect, useState } from "react";
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
      <div className="p-10 text-center">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold">
          No Orders Found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-8">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-xl p-6"
          >
            <div className="flex justify-between mb-5">

              <div>
                <h2 className="font-bold">
                  Order ID:
                </h2>

                <p className="text-gray-500">
                  {order._id}
                </p>
              </div>

              <div>
                <span
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full"
                >
                  {order.status}
                </span>
              </div>

            </div>

            <div className="space-y-4">

              {order.allProduct.map((product) => (
                <div
                  key={product.id?._id}
                  className="flex items-center gap-5 border-b pb-4"
                >
                  <img
                    src={`http://localhost:5000/uploads/products/${product.id?.pImages?.[0]}`}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold">
                      {product.id?.pName}
                    </h3>

                    <p>
                      Quantity: {product.quantity}
                    </p>

                    <p>
                      ₹{product.id?.pPrice}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            <div className="mt-5 flex justify-between font-bold text-lg">

              <span>
                Total Amount
              </span>

              <span>
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