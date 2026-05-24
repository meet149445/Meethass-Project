import axios from "axios";

const API = import.meta.env.VITE_API_URL;


// Register User
export const registerUser = async (data) => {
  try {

    const response = await axios.post(
      `${API}/auth/register`,
      data
    );

    return response.data;

  } catch (error) {

    console.log(error);

    throw error;
  }
};


// Login User
export const loginUser = async (data) => {
  try {

    const response = await axios.post(
      `${API}/auth/login`,
      data
    );

    return response.data;

  } catch (error) {

    console.log(error);

    throw error;
  }
};