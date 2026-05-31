import styles from "./Navbar.module.css";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

const Navbar = () => {

  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal]
    = useState(false);

  const [cartCount, setCartCount]
    = useState(0);

  // Get user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // CHECK ADMIN
  const isAdmin =
    user?.role === "admin";

  useEffect(() => {

    const updateCartCount = () => {

      const cart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];

      const count = cart.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );

      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    return () => {

      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );
    };

  }, []);

  // Logout Confirm
  const confirmLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();
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

          {isAdmin && (
            <Link to="/admin">
              🔥 Admin
            </Link>
          )}

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