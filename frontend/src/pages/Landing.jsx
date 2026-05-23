import { Link } from "react-router-dom";

import styles from "./Landing.module.css";

const Landing = () => {

  return (
    <div className={styles.landing}>

      <div className={styles.overlay}>

        <h1>
          Welcome To Mithaas 🍬
        </h1>

        <p>
          Bringing sweetness to every celebration with authentic Indian sweets made with love and tradition.
        </p>

        <div className={styles.buttons}>

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

        </div>

      </div>

      <section className={styles.aboutSection}>

        <h2>
          Who We Are
        </h2>

        <p>
          Mithaas is your online sweet shop delivering fresh and delicious Indian sweets directly to your home.
        </p>

      </section>

      <section className={styles.features}>

        <div className={styles.featureCard}>
          <h3>🍭 Premium Quality</h3>

          <p>
            Made using fresh ingredients and traditional recipes.
          </p>
        </div>

        <div className={styles.featureCard}>
          <h3>🚚 Fast Delivery</h3>

          <p>
            Fresh sweets delivered quickly to your doorstep.
          </p>
        </div>

        <div className={styles.featureCard}>
          <h3>❤️ Made With Love</h3>

          <p>
            Every sweet is crafted carefully for perfect taste.
          </p>
        </div>

      </section>

    </div>
  );
};

export default Landing;