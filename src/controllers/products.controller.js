import axios from "axios";

const baseURL = "http://localhost:8080";

export const productRoute = async (route) => {
  try {
    const response = await axios.get(`${baseURL}/api/products/${route}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
