import { useState } from "react";

import styles from "./Cart.module.css";

import imageMap from "../ImagesMap";

import PaymentModal from "../components/PaymentModal.jsx"

import axios from "axios";

const Cart = () => {

  const [showPayment, setShowPayment] = useState(false);

  const cart = JSON.parse(
    localStorage.getItem("cart")
  ) || [];

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
          quantity: item.quantity + 1
        };
      }

      return item;
    });

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.location.reload();
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {

    const updatedCart = cart.map((item) => {

      if (item._id === id) {

        return {
          ...item,
          quantity: item.quantity - 1
        };
      }

      return item;
    });

    // REMOVE ITEMS WITH 0 QUANTITY
    const filteredCart = updatedCart.filter(
      (item) => item.quantity > 0
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(filteredCart)
    );

    window.location.reload();
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {

    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.location.reload();
  };

  // PAYMENT SUCCESS
const handlePaymentSuccess = async () => {

  try {

    alert("Payment Successful");

    const cartItems =
      JSON.parse(localStorage.getItem("cart")) || [];

    const token = localStorage.getItem("token");

    const formattedItems = cartItems.map((item) => ({
  productId: item._id,
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  image: imageMap[item.image],
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

    localStorage.removeItem("cart");

    window.location.reload();

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

                  <p>
                    ₹{item.price}
                  </p>

                  {/* QUANTITY CONTROLS */}
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
                    Total:
                    ₹
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

          {/* TOTAL BOX */}
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

          {/* PAYMENT MODAL */}
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