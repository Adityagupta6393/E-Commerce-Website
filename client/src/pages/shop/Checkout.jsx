import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MapPin, Phone, CreditCard } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import {
  createRazorpayOrder,
  verifyPayment,
} from "../../api/razorpayApi";

import { createOrder } from "../../api/orderApi";

function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.pPrice * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!address.trim() || !phone.trim()) {
      return toast.error("Fill all fields");
    }

    if (cart.length === 0) {
      return toast.error("Cart is empty");
    }

    try {
      const razorpayOrder =
        await createRazorpayOrder(totalAmount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async (response) => {
          const verifyRes =
            await verifyPayment(response);

          if (!verifyRes.success) {
            return toast.error(
              "Payment verification failed"
            );
          }

          const allProduct = cart.map((item) => ({
            id: item._id,
            quantity: item.quantity,
          }));

          const orderRes = await createOrder({
            allProduct,
            user: user._id,
            amount: totalAmount,
            transactionId:
              response.razorpay_payment_id,
            address,
            phone,
          });

          if (orderRes.success) {
            toast.success("Order placed");

            clearCart();

            navigate("/my-orders");
          }
        },

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: phone,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8">

      {/* Header */}
      <div className="mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Checkout
        </h1>

        <p className="text-gray-500 mt-1">
          Complete your delivery and payment details
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

        {/* Delivery Details */}
        <div className="lg:col-span-2">

          <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-sm">

            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Delivery Information
            </h2>

            <div className="space-y-5">

              {/* Address */}
              <div>

                <label className="flex items-center gap-2 font-medium mb-2">
                  <MapPin size={18} />
                  Delivery Address
                </label>

                <textarea
                  placeholder="Enter your complete delivery address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  rows={4}
                  className="w-full border border-gray-300 p-3 sm:p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />

              </div>

              {/* Phone */}
              <div>

                <label className="flex items-center gap-2 font-medium mb-2">
                  <Phone size={18} />
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full border border-gray-300 p-3 sm:p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

            </div>

          </div>

        </div>

        {/* Order Summary */}
        <div>

          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm lg:sticky lg:top-24">

            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Order Summary
            </h2>

            {/* Products */}
            <div className="space-y-4 max-h-72 overflow-y-auto">

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3"
                >

                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/products/${item.pImages[0]}`}
                    alt={item.pName}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg shrink-0"
                  />

                  <div className="flex-1 min-w-0">

                    <h3 className="font-semibold truncate">
                      {item.pName}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <p className="font-semibold whitespace-nowrap">
                    ₹{item.pPrice * item.quantity}
                  </p>

                </div>
              ))}

            </div>

            {/* Total */}
            <div className="border-t mt-5 pt-5">

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span>
                  ₹{totalAmount}
                </span>
              </div>

            </div>

            {/* Payment */}
            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
            >
              <CreditCard size={20} />
              Pay ₹{totalAmount}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              You will be redirected to Razorpay's secure
              payment gateway.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;