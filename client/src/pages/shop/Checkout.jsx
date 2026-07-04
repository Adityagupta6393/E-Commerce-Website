import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
    if (!address || !phone) {
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

      const razor = new window.Razorpay(
        options
      );

      razor.open();
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="bg-white p-8 rounded-xl shadow">

        <input
          type="text"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="w-full border p-4 rounded mb-5"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full border p-4 rounded mb-5"
        />

        <div className="text-2xl font-bold mb-6">
          Total: ₹{totalAmount}
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-4 rounded-xl"
        >
          Pay With Razorpay
        </button>

      </div>

    </div>
  );
}

export default Checkout;