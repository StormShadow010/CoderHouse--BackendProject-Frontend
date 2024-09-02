import axios from "axios";

const baseURL = "http://localhost:8080";

export const authPost = async (route = "", data = {}) => {
  try {
    const response = await axios.post(`${baseURL}/api/auth${route}`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const authPut = async (route = "", data = {}) => {
  try {
    const response = await axios.put(`${baseURL}/api/auth${route}`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
