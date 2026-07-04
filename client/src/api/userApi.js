import api from "./axios";

export const getAllUsers = async () => {
  const { data } = await api.get("/user/all-user");
  return data;
};

export const getSingleUser = async (uId) => {
  const { data } = await api.post("/user/single-user", {
    uId,
  });

  return data;
};

export const editUser = async (uId, name, phoneNumber) => {
  const { data } = await api.post("/user/edit-user", {
    uId,
    name,
    phoneNumber,
  });

  return data;
};

export const changePassword = async (
  uId,
  oldPassword,
  newPassword
) => {
  const { data } = await api.post("/user/change-password", {
    uId,
    oldPassword,
    newPassword,
  });

  return data;
};