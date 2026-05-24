import { useEffect, useState } from "react";

import styles from "./Orders.module.css";

import { getMyOrders }
from "../services/orderService";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    const data = await getMyOrders();

    setOrders(data || []);
  };

  return (

    <div className={styles.ordersContainer}>

      <div className={styles.topSection}>

        <h1 className={styles.heading}>
          My Orders
        </h1>

        <p className={styles.subHeading}>
          Your delicious sweets delivered 🍬
        </p>

      </div>

      {orders.length === 0 ? (

        <div className={styles.emptyContainer}>

          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="empty"
            className={styles.emptyImage}
          />

          <h2 className={styles.emptyTitle}>
            No Orders Yet
          </h2>

          <p className={styles.emptyText}>
            Order sweets and they will appear here.
          </p>

        </div>

      ) : (

        <div className={styles.ordersGrid}>

          {orders.map((order) => (

            <div key={order._id}>

              {order.items.map((item, index) => (

                <div
                  key={index}
                  className={styles.orderCard}
                >

                  {/* IMAGE */}
                  <div className={styles.imageBox}>

                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.productImage}
                    />

                  </div>

                  {/* DETAILS */}
                  <div className={styles.cardContent}>

                    <h2 className={styles.productTitle}>
                      {item.name}
                    </h2>

                    <p className={styles.productPrice}>
                      ₹ {item.price}
                    </p>

                    <p className={styles.quantity}>
                      Quantity: {item.quantity}
                    </p>

                    <div className={styles.bottomRow}>

                      <span className={styles.status}>
                        {order.orderStatus}
                      </span>

                      <span className={styles.total}>
                        ₹ {item.price * item.quantity}
                      </span>

                    </div>

                    <button className={styles.orderButton}>
                      Order Successful
                    </button>

                  </div>

                </div>
              ))}

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Orders;