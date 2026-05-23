import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Admin.module.css";
import imageMap from "../ImagesMap";

const Admin = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      console.log("TOKEN => ", token);

      const response = await axios.get(
        "http://localhost:8000/orders/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("SUCCESS RESPONSE => ", response.data);

      setOrders(response.data);

    } catch (error) {

      console.log("FULL ERROR => ", error);

      console.log(
        "ERROR RESPONSE => ",
        error.response
      );

      alert(
        error?.response?.data?.message ||
        "Failed to fetch orders"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={styles.adminContainer}>

      {/* HERO */}
      <div className={styles.hero}>

        <div>
          <h1 className={styles.heading}>
            Admin Dashboard
          </h1>

          <p className={styles.subHeading}>
            Manage products, orders & sweet shop activity
          </p>
        </div>

        <div className={styles.statsBox}>
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

      </div>

      {/* CARDS */}
      <div className={styles.cardsContainer}>

        <Link
          to="/admin/add-product"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            🍭
          </div>

          <div>
            <h2>Add Product</h2>
            <p>Add new sweets to your store</p>
          </div>
        </Link>

        <Link
          to="/admin/manage-products"
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            📦
          </div>

          <div>
            <h2>Manage Products</h2>
            <p>Edit or remove existing sweets</p>
          </div>
        </Link>

      </div>

      {/* ORDERS SECTION */}
      <div className={styles.section}>

        <div className={styles.sectionTop}>
          <h2 className={styles.sectionHeading}>
            Recent Orders
          </h2>
        </div>

        {loading ? (

          <div className={styles.loaderBox}>
            <div className={styles.loader}></div>
            <p>Loading orders...</p>
          </div>

        ) : orders.length === 0 ? (

          <div className={styles.emptyBox}>
            <h3>No Orders Yet</h3>

            <p>
              Your customers haven't placed any orders yet.
            </p>
          </div>

        ) : (

          <div className={styles.ordersGrid}>

            {orders.map((order) => (

              <div
                key={order._id}
                className={styles.orderCard}
              >

                <div className={styles.orderTop}>

                  <div>
                    <h3>{order.customerName}</h3>

                    <span className={styles.orderId}>
                      #{order._id.slice(-6)}
                    </span>
                  </div>

                  <p className={styles.amount}>
                    ₹{order.totalAmount}
                  </p>

                </div>

                <div className={styles.badges}>

                  <span
                    className={`${styles.badge} ${styles.payment}`}
                  >
                    {order.paymentStatus}
                  </span>

                  <span
                    className={`${styles.badge} ${styles.status}`}
                  >
                    {order.orderStatus}
                  </span>

                </div>

                <div className={styles.items}>

                  {order.items?.map((item, index) => (

                    <div
                      key={index}
                      className={styles.item}
                    >

                      <img
  src={imageMap[item.image] || item.image}
  alt={item.name}
/>

                      <div className={styles.itemInfo}>
                        <h4>{item.name}</h4>

                        <p>
                          Quantity : {item.quantity}
                        </p>
                      </div>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Admin;