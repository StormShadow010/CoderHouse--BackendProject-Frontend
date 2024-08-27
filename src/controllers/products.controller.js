import axios from "axios";

const baseURL = "http://localhost:8080";

export const getProductsAll = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
