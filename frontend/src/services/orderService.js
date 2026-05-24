import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/orders`;


// GET MY ORDERS
export const getMyOrders = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      `${API}/myorders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.log(error);

    return [];
  }
};