import { useState } from "react";

import styles from "./Cart.module.css";
import imageMap from "../ImagesMap";
import PaymentModal from "../components/PaymentModal.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // TOTAL AMOUNT
  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) => {

      if (item._id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
    window.dispatchEvent(
  new Event("cartUpdated")
);
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {

    const updatedCart = cart.map((item) => {

      if (item._id === id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    });

    const filteredCart = updatedCart.filter(
      (item) => item.quantity > 0
    );

    setCart(filteredCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(filteredCart)
    );
    window.dispatchEvent(
  new Event("cartUpdated")
);
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {

    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
    window.dispatchEvent(
  new Event("cartUpdated")
);
  };

// PAYMENT SUCCESS
const handlePaymentSuccess = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const formattedItems = cart.map((item) => ({
  productId: item._id,
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  image: item.image,
}));

    const orderData = {
      items: formattedItems,
      totalAmount,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    // Clear cart
    localStorage.removeItem("cart");

    // Update Navbar count instantly
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    // Update local state
    setCart([]);

    // Close payment modal
    setShowPayment(false);

    // Redirect to Orders page
    navigate("/orders");

  } catch (error) {

    console.log(error);

    alert("Failed to place order");
  }
};

  return (
    <div className={styles.cartContainer}>

      <h1 className={styles.heading}>
        Your Cart 🛒
      </h1>

      {cart.length === 0 ? (

        <h2 className={styles.emptyCart}>
          Cart is Empty
        </h2>

      ) : (

        <>
          <div className={styles.cartItems}>

            {cart.map((item) => (

              <div
                key={item._id}
                className={styles.cartCard}
              >

                <img
                  src={imageMap[item.image]}
                  alt={item.name}
                  className={styles.image}
                />

                <div className={styles.details}>

                  <h2>{item.name}</h2>

                  <p>₹{item.price}</p>

                  <div className={styles.quantityBox}>

                    <button
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <p className={styles.subtotal}>
                    Total: ₹
                    {item.price * item.quantity}
                  </p>

                  <button
                    className={styles.removeBtn}
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className={styles.totalBox}>

            <h2>
              Grand Total: ₹{totalAmount}
            </h2>

            <button
              className={styles.paymentBtn}
              onClick={() => setShowPayment(true)}
            >
              Proceed To Payment
            </button>

          </div>

          <PaymentModal
            show={showPayment}
            onClose={() => setShowPayment(false)}
            grandTotal={totalAmount}
            onPaymentSuccess={handlePaymentSuccess}
          />

        </>
      )}

    </div>
  );
};

export default Cart;