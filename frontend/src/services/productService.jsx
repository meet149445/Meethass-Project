import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/products`;


// GET ALL PRODUCTS
export const getProducts = async () => {

  try {

    const response = await axios.get(API);

    return response.data;

  } catch (error) {

    console.log(error);

    return [];
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

    return null;
  }
};