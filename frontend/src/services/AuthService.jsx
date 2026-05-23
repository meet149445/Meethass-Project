import axios from "axios";

const API = "http://localhost:8000/auth";


// Register User
export const registerUser = async (data) => {
  try {

    const response = await axios.post(
      `${API}/register`,
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
      `${API}/login`,
      data
    );

    return response.data;

  } catch (error) {

    console.log(error);

    throw error;
  }
};