import api from "./axios";

export const signupUser = async (userData) => {
  const { data } = await api.post("/signup", userData);
  return data;
};

export const signinUser = async (userData) => {
  const { data } = await api.post("/signin", userData);
  return data;
};

export const checkAdmin = async (loggedInUserId) => {
  const { data } = await api.post("/isadmin", {
    loggedInUserId,
  });

  return data;
};