import api from "./axios";

export const createOrder = async (orderData) => {
  const { data } = await api.post(
    "/order/create-order",
    orderData
  );

  return data;
};

export const getOrdersByUser = async (uId) => {
  const { data } = await api.post(
    "/order/order-by-user",
    { uId }
  );

  return data;
};

export const getAllOrders = async () => {
  const { data } = await api.get(
    "/order/get-all-orders"
  );

  return data;
};

export const updateOrder = async (oId, status) => {
  const { data } = await api.post(
    "/order/update-order",
    {
      oId,
      status,
    }
  );

  return data;
};

export const deleteOrder = async (oId) => {
  const { data } = await api.post(
    "/order/delete-order",
    { oId }
  );

  return data;
};