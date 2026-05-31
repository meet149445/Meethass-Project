import { useState } from "react";

import styles from "./ProductCard.module.css";

import imageMap from "../ImagesMap";

import { useNavigate }
from "react-router-dom";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const [added, setAdded] =
    useState(false);

  const addToCart = () => {

    // Get existing cart
    const existingCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    // Check if product exists
    const productExists =
      existingCart.find(
        (item) =>
          item._id === product._id
      );

    let updatedCart;

    if (productExists) {

      // Increase quantity
      updatedCart =
        existingCart.map((item) => {

          if (
            item._id === product._id
          ) {

            return {
              ...item,
              quantity:
                item.quantity + 1
            };
          }

          return item;
        });

    } else {

      // Add new product
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1
        }
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

    }, 1000);
  };

  return (

    <div
      className={styles.card}
      onClick={() =>
        navigate(
          `/product/${product._id}`
        )
      }
    >

      <img
        src={imageMap[product.image]}
        alt={product.name}
      />

      <h2>{product.name}</h2>

      <p>
        ₹ {product.price}
      </p>

      <button
        onClick={(e) => {

          e.stopPropagation();

          addToCart();
        }}
      >
        {added
          ? "✓ Added"
          : "Add To Cart"}
      </button>

    </div>
  );
};

export default ProductCard;