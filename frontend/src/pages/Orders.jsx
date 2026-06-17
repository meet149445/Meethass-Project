import { useEffect, useState } from "react";
import imageMap from "../ImagesMap";
import styles from "./Orders.module.css";

import { getMyOrders } from "../services/orderService";
import UserLayout from "../layouts/UserLayout";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>    
    <div className={styles.ordersContainer}>
      <div className={styles.topSection}>
        <h1 className={styles.heading}>
          My Orders
        </h1>

        <p className={styles.subHeading}>
          Your delicious sweets delivered 🍬
        </p>
      </div>

      {loading ? (
        <div className={styles.emptyContainer}>
          <h2>Loading Orders...</h2>
        </div>
      ) : orders.length === 0 ? (
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
            <div
              key={order._id}
              className={styles.orderCard}
            >
              <div className={styles.cardContent}>
                <div className={styles.orderHeader}>
                  <h3 className={styles.orderId}>
                    Order #{order._id.slice(-6)}
                  </h3>

                  <span className={styles.status}>
                    {order.orderStatus}
                  </span>
                </div>

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className={styles.orderItem}
                  >
                    <div className={styles.itemImageBox}>
                      <img
                        src={
                          imageMap[item.image] ||
                          item.image
                        }
                        alt={item.name}
                        className={styles.itemImage}
                      />
                    </div>

                    <div className={styles.itemDetails}>
                      <h3>{item.name}</h3>

                      <p>
                        Price: ₹{item.price}
                      </p>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                      <p>
                        Item Total: ₹
                        {item.price *
                          item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                <div className={styles.orderFooter}>
                  <h3>
                    Total Amount: ₹
                    {order.totalAmount}
                  </h3>

                  <button
                    className={styles.orderButton}
                  >
                    Order Successful
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </UserLayout>

  );
};

export default Orders;