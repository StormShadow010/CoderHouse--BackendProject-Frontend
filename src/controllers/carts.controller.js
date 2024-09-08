import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://backendcoderhouse-jt1v.onrender.com";
// const baseURL = "http://localhost:8081";

export const cartsCreate = async (route, data) => {
  try {
    const token = Cookies.get("token");
    const opts = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const response = await axios.post(
      `${baseURL}/api/carts${route}`,
      data,
      opts
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const cartsGet = async (route) => {
  try {
    const opts = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get(`${baseURL}/api/carts${route}`, opts);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const cartsDeleteProduct = async (productId) => {
  try {
    const token = Cookies.get("token");
    const opts = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const response = await axios.delete(
      `${baseURL}/api/carts/${productId}`,
      opts
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const cartsUpdateProductQuantity = async (productId, quantity) => {
  try {
    const token = Cookies.get("token");
    const opts = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const response = await axios.put(
      `${baseURL}/api/carts/${productId}`,
      { quantity },
      opts
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
