import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
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
      <div className="min-h-[60vh] flex items-center justify-center px-4">

        <div className="text-center">

          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <ShoppingCart size={32} />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mb-6">
            Add some products to your cart and come back here.
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8">

      {/* Heading */}
      <div className="mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Shopping Cart
        </h1>

        <p className="text-gray-500 mt-1">
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">

          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm p-4 sm:p-5"
            >

              <div className="flex gap-3 sm:gap-5">

                {/* Product Image */}
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/products/${item.pImages[0]}`}
                  alt={item.pName}
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-lg shrink-0"
                />

                {/* Product Details */}
                <div className="flex-1 min-w-0">

                  <h2 className="text-base sm:text-xl md:text-2xl font-bold truncate">
                    {item.pName}
                  </h2>

                  <p className="text-green-600 font-bold mt-1 sm:mt-2">
                    ₹{item.pPrice}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3 sm:mt-5">

                    <button
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                      className="p-1.5 sm:p-2 border rounded-lg hover:bg-gray-100 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold min-w-5 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                      className="p-1.5 sm:p-2 border rounded-lg hover:bg-gray-100 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                  className="self-start text-red-500 hover:text-red-600 p-1"
                  aria-label="Remove product"
                >
                  <Trash2 size={20} />
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* Summary */}
        <div className="lg:col-span-1">

          <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 lg:sticky lg:top-24">

            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4 text-gray-600">
              <span>Items</span>

              <span>
                {cart.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg">

              <span className="font-semibold">
                Total
              </span>

              <span className="font-bold">
                ₹{totalPrice}
              </span>

            </div>

            <Link
              to="/checkout"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-6 transition"
            >
              Proceed To Checkout
            </Link>

            <Link
              to="/"
              className="block text-center text-blue-600 hover:text-blue-700 mt-4"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;