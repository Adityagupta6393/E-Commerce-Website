import api from "./axios";

export const createRazorpayOrder = async (amount) => {
  const { data } = await api.post(
    "/razorpay/create-order",
    { amount }
  );

  return data;
};

export const verifyPayment = async (paymentData) => {
  const { data } = await api.post(
    "/razorpay/verify-payment",
    paymentData
  );

  return data;
};