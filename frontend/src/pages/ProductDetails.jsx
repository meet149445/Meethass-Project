import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getSingleProduct } from "../services/productService";

import imageMap from "../ImagesMap";

import styles from "./ProductDetails.module.css";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {

    const data = await getSingleProduct(id);

    setProduct(data);
  };

  // ADD TO CART
  const addToCart = () => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const productExists =
      existingCart.find(
        (item) => item._id === product._id
      );

    let updatedCart;

    if (productExists) {

      updatedCart = existingCart.map((item) => {

        if (item._id === product._id) {

          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

    } else {

      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
    window.dispatchEvent(
  new Event("cartUpdated")
);

    setAdded(true);

setTimeout(() => {
  setAdded(false);
}, 1500);
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />

      <div className={styles.container}>

        <div className={styles.card}>

          <img
            src={imageMap[product.image]}
            alt={product.name}
            className={styles.image}
          />

          <div className={styles.details}>

            <h1>{product.name}</h1>

            <p className={styles.price}>
              ₹{product.price}
            </p>

            <p className={styles.category}>
              Category: {product.category}
            </p>

            <p className={styles.description}>
              {
                product.description ||
                "Delicious traditional Indian sweet made with love and premium ingredients 🍬"
              }
            </p>

            <button
  onClick={addToCart}
  className={styles.cartBtn}
  disabled={added}
>
  {added ? "✓ Added" : "Add To Cart"}
</button>

          </div>

        </div>

      </div>
    </>
  );
};

export default ProductDetails;