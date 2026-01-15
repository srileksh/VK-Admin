import axiosInstance from "./axios";

export async function login( email, password ) {
  const { data } = await axiosInstance.post("/admin/login", {
    email,
    password,
  });

  return data;
}