import axios from "axios";
import Cookies from "js-cookie";

// const baseURL = "https://backendcoderhouse-jt1v.onrender.com";
const baseURL = "http://localhost:8081";

export const ticketsGet = async (route) => {
  try {
    const token = Cookies.get("token");
    const opts = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const response = await axios.get(`${baseURL}/api/tickets${route}`, opts);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const ticketsPost = async (id) => {
  try {
    // Obtén el token de la cookie
    const token = Cookies.get("token"); // Reemplaza 'yourCookieName' con el nombre de tu cookie
    // Configura los headers para incluir el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Usa 'Bearer' si tu backend sigue esta convención, si no, ajusta según sea necesario
      },
      withCredentials: true,
    };
    const response = await axios.post(
      `${baseURL}/api/tickets/${id}`,
      {},
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const ticketCheckoutPost = async (id) => {
  try {
    const opts = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.post(
      `${baseURL}/api/checkout?uid=${id}`,
      {},
      opts
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
