import { useEffect, useState } from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import styles from "./AddProduct.module.css";

const EditProduct = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData]
    = useState({
      name: "",
      price: "",
      image: "",
      description: "",
    });

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    const response = await axios.get(
      `http://localhost:8000/products/${id}`
    );

    setFormData(response.data);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/products/update/${id}`,
        formData,
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert(
        "Product Updated 🔥"
      );

      navigate(
        "/admin/manage-products"
      );

    } catch (error) {

      alert(
        error.response.data.message
      );
    }
  };

  return (

    <div className={styles.container}>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >

        <h1>Edit Product 🍬</h1>

        <input
          type="text"
          name="name"
          placeholder="Sweet Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
          Update Product
        </button>

      </form>

    </div>
  );
};

export default EditProduct;