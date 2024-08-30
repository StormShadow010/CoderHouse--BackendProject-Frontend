import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:8080";

export const usersGet = async (route = "") => {
  try {
    // Obtén el token de la cookie
    const token = Cookies.get("token"); // Reemplaza 'yourCookieName' con el nombre de tu cookie

    // Configura los headers para incluir el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Usa 'Bearer' si tu backend sigue esta convención, si no, ajusta según sea necesario
      },
    };

    const response = await axios.get(`${baseURL}/api/auth/${route}`, config);
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
