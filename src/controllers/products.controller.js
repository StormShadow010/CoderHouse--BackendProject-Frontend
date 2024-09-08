import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://backendcoderhouse-jt1v.onrender.com";

export const productRoute = async (route) => {
  try {
    const response = await axios.get(`${baseURL}/api/products/${route}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const productsGet = async (route, { userId = "", userRole = "" }) => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "user-id": userId,
        "user-role": userRole,
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const response = await axios.get(`${baseURL}/api/products${route}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const productPost = async (route, data) => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const response = await axios.post(
      `${baseURL}/api/products${route}`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const productPut = async (route, data) => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const response = await axios.put(
      `${baseURL}/api/products${route}`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const productDelete = async (route) => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const response = await axios.delete(
      `${baseURL}/api/products/${route}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
