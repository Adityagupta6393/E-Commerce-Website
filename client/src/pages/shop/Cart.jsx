import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.pPrice * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Your Cart is Empty
        </h1>

        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Cart Items */}

        <div className="lg:col-span-2 space-y-5">

          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow p-5 flex gap-5"
            >
              <img
                src={`http://localhost:5000/uploads/products/${item.pImages[0]}`}
                className="w-32 h-32 object-cover rounded-lg"
              />

              <div className="flex-1">

                <h2 className="text-2xl font-bold">
                  {item.pName}
                </h2>

                <p className="text-green-600 font-bold mt-2">
                  ₹{item.pPrice}
                </p>

                <div className="flex items-center gap-3 mt-5">

                  <button
                    onClick={() =>
                      decreaseQuantity(item._id)
                    }
                    className="p-2 border rounded"
                  >
                    <Minus size={18} />
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                    className="p-2 border rounded"
                  >
                    <Plus size={18} />
                  </button>

                </div>

              </div>

              <button
                onClick={() =>
                  removeFromCart(item._id)
                }
                className="text-red-500"
              >
                <Trash2 />
              </button>

            </div>
          ))}

        </div>

        {/* Summary */}

        <div className="bg-white rounded-xl shadow p-6 h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-bold">
              ₹{totalPrice}
            </span>
          </div>

          <Link
            to="/checkout"
            className="block text-center bg-blue-600 text-white py-3 rounded-lg"
          >
            Proceed To Checkout
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;