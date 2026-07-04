import api from "./axios";

export const getAllCategories = async () => {
  const { data } = await api.get("/category/all-category");
  return data;
};

export const addCategory = async (formData) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post(
    "/category/add-category",
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

export const editCategory = async (
  cId,
  cDescription,
  cStatus
) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post(
    "/category/edit-category",
    {
      cId,
      cDescription,
      cStatus,
    },
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteCategory = async (cId) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post(
    "/category/delete-category",
    { cId },
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );

  return data;
};