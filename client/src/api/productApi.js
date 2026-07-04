import api from "./axios";

export const getAllProducts = async () => {
  const { data } = await api.get("/product/all-product");
  return data;
};

export const getSingleProduct = async (pId) => {
  const { data } = await api.post("/product/single-product", {
    pId,
  });

  return data;
};

export const getProductsByCategory = async (catId) => {
  const { data } = await api.post("/product/product-by-category", {
    catId,
  });

  return data;
};

export const getProductsByPrice = async (price) => {
  const { data } = await api.post("/product/product-by-price", {
    price,
  });

  return data;
};

export const addProduct = async (formData) => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user"));

  const { data } = await api.post(
    "/product/add-product",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const editProduct = async (formData) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post(
    "/product/edit-product",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteProduct = async (pId) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post(
    "/product/delete-product",
    { pId },
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const searchProducts = async (keyword) => {
  const { data } = await api.post(
    "/product/search-product",
    { keyword }
  );

  return data;
};

export const getWishProducts = async (
  productArray
) => {
  const { data } = await api.post(
    "/product/wish-product",
    {
      productArray,
    }
  );

  return data;
};