import { useEffect, useState } from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import styles from "./ManageProducts.module.css";

import imageMap from "../ImagesMap";

const ManageProducts = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8000/products"
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/products/delete/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert("Product Deleted 🔥");

      fetchProducts();

    } catch (error) {

      alert(error.response.data.message);
    }
  };

  return (

    <div className={styles.container}>

      <h1 className={styles.heading}>
        Manage Products 🔥
      </h1>

      <div className={styles.grid}>

        {products.map((product) => (

          <div
            key={product._id}
            className={styles.card}
          >

            <img
              src={
                imageMap[product.image]
              }
              alt={product.name}
            />

            <h2>
              {product.name}
            </h2>

            <p>
              ₹ {product.price}
            </p>

            <div className={styles.buttonGroup}>

              <button
                className={styles.editBtn}
                onClick={() =>
                  navigate(
                    `/admin/edit-product/${product._id}`
                  )
                }
              >
                Edit Product
              </button>

              <button
                className={styles.deleteBtn}
                onClick={() =>
                  deleteProduct(product._id)
                }
              >
                Delete Product
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ManageProducts;