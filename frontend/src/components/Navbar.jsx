import styles from "./Navbar.module.css";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useState } from "react";

const Navbar = () => {

  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal]
    = useState(false);

  // Get user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // CHECK ADMIN
  const isAdmin =
    user?.role === "admin";

  // Cart
  const cart = JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  // Cart Count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Logout Confirm
   const confirmLogout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem("cart");

  navigate("/");
};

  return (
    <>
      <nav className={styles.navbar}>

        <h1 className={styles.logo}>
          Mithaas 🍬
        </h1>

        <div className={styles.navLinks}>

          <Link to="/home">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link
            to="/cart"
            className={styles.cartLink}
          >
            🛒 Cart

            <span className={styles.cartCount}>
              {cartCount}
            </span>
          </Link>

          <Link to="/orders">
            📦 Orders
          </Link>

          {/* ADMIN ONLY */}
          {isAdmin && (
            <Link to="/admin">
              🔥 Admin
            </Link>
          )}

          {/* BEFORE LOGIN */}
          {!user && (
            <>
              <Link to="/login">
                <button className={styles.loginBtn}>
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className={styles.registerBtn}>
                  Register
                </button>
              </Link>
            </>
          )}

          {/* AFTER LOGIN */}
          {user && (
            <div className={styles.userSection}>

              <Link
                to="/profile"
                className={styles.userName}
              >
                👤 {user.name}
              </Link>

              <button
                className={styles.logoutBtn}
                onClick={() =>
                  setShowLogoutModal(true)
                }
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </nav>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (

        <div className={styles.modalOverlay}>

          <div className={styles.logoutModal}>

            <h2>
              Logout Confirmation
            </h2>

            <p>
              Are you sure you want to logout?
            </p>

            <div className={styles.modalButtons}>

              <button
                className={styles.cancelBtn}
                onClick={() =>
                  setShowLogoutModal(false)
                }
              >
                Cancel
              </button>

              <button
                className={styles.confirmBtn}
                onClick={confirmLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default Navbar;