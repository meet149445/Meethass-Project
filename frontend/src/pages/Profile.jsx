// Profile.jsx

import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const cart = JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  // Total cart items
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total cart amount
  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className={styles.profileContainer}>

        {/* Background Blur Effects */}
        <div className={styles.blurOne}></div>
        <div className={styles.blurTwo}></div>

        <div className={styles.profileCard}>

          {/* Top Header */}
          <div className={styles.topSection}>

            <div className={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h1>
              Welcome,
              {" "}
              {user?.name}
              {" "}🍬
            </h1>

            <p className={styles.subtitle}>
              Sweet moments start here ✨
            </p>

          </div>

          {/* User Info */}
          <div className={styles.infoSection}>

            <div className={styles.infoBox}>
              <span>👤 Name</span>
              <h3>{user?.name}</h3>
            </div>

            <div className={styles.infoBox}>
              <span>📧 Email</span>
              <h3>{user?.email}</h3>
            </div>

            <div className={styles.infoBox}>
              <span>📍 Address</span>

              <h3>

                {user?.address ? (
                  <>
                    {user.address.fullName}
                    <br />

                    {user.address.phone}
                    <br />

                    {user.address.street},
                    {" "}
                    {user.address.area}
                    <br />

                    {user.address.city},
                    {" "}
                    {user.address.state}
                    {" - "}
                    {user.address.pincode}
                  </>
                ) : (
                  "No Address Added"
                )}

              </h3>

            </div>

          </div>

          {/* Stats */}
          <div className={styles.statsSection}>

            <div className={styles.statCard}>
              <h2>{totalItems}</h2>
              <p>🛒 Cart Items</p>
            </div>

            <div className={styles.statCard}>
              <h2>₹{totalAmount}</h2>
              <p>💰 Total Cart</p>
            </div>

            <div className={styles.statCard}>
              <h2>Premium</h2>
              <p>💎 Mithaas Member</p>
            </div>

          </div>

          {/* Buttons */}
          <div className={styles.buttons}>

            <button
              className={styles.shopBtn}
              onClick={() => navigate("/home")}
            >
              Shop More
            </button>

            <button
              className={styles.cartBtn}
              onClick={() => navigate("/cart")}
            >
              View Cart
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default Profile;