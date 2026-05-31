import styles from "./ProductCard.module.css";

import imageMap from "../ImagesMap";

import { useNavigate }
from "react-router-dom";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

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

    if (productExists) {

      // Increase quantity
      const updatedCart =
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

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );
      window.dispatchEvent(
  new Event("cartUpdated")
);

    } else {

      // Add new product
      const updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1
        }
      ];

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );
      window.dispatchEvent(
  new Event("cartUpdated")
);
    }

    // Refresh navbar/cart
    alert("Added to Cart 🛒");
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
        Add To Cart
      </button>

    </div>
  );
};

export default ProductCard;