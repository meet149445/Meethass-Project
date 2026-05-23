import { useState } from "react";

import axios from "axios";

import styles from "./AddProduct.module.css";

const AddProduct = () => {

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/products/create",
        formData,
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert("Product Added Successfully 🔥");

      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
      });

    } catch (error) {

      alert(error.response.data.message);
    }
  };

  return (

    <div className={styles.container}>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >

        <h1>Add Product 🍬</h1>

        <input
          type="text"
          name="name"
          placeholder="Sweet Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image Name"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>
  );
};

export default AddProduct;