import axios from "axios";

const API =
  "http://localhost:8000/products";

// GET ALL PRODUCTS
export const getProducts = async () => {

  try {

    const response = await axios.get(API);

    return response.data;

  } catch (error) {

    console.log(error);

  }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (
  id
) => {

  try {

    const response = await axios.get(
      `${API}/${id}`
    );

    return response.data;

  } catch (error) {

    console.log(error);

  }
};