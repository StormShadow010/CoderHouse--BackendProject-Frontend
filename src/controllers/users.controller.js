import axios from "axios";

const baseURL = "http://localhost:8080";

export const usersGet = async (route) => {
  try {
    const response = await axios.get(`${baseURL}/api/auth/${route}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const usersPost = async (route, data) => {
  try {
    const opts = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Incluir cookies en la solicitud
    };
    const response = await axios.post(
      `${baseURL}/api/auth/${route}`,
      data,
      opts
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
