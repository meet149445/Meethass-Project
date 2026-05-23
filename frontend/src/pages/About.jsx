import Navbar from "../components/Navbar";

import styles from "./About.module.css";

const About = () => {

  return (
    <>
      <Navbar />

      <div className={styles.aboutContainer}>

        {/* HERO SECTION */}
        <div className={styles.heroSection}>

          <h1>
            About Mithaas 🍬
          </h1>

          <p>
            Bringing sweetness, happiness, and tradition
            to every celebration with authentic Indian sweets.
          </p>

        </div>

        {/* STORY SECTION */}
        <div className={styles.storySection}>

          <h2>
            Our Story
          </h2>

          <p>
            Mithaas was created with a passion for delivering
            fresh and delicious Indian sweets online.
            From Kaju Katli to Rasmalai, every sweet is
            prepared with love, quality ingredients,
            and traditional recipes.
          </p>

        </div>

        {/* FEATURES */}
        <div className={styles.featuresSection}>

          <div className={styles.featureCard}>
            <h3>🍭 Premium Quality</h3>

            <p>
              We use high-quality ingredients for rich taste.
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
              Every sweet is crafted carefully for happiness.
            </p>
          </div>

        </div>

        {/* CREATOR SECTION */}
        <div className={styles.creatorSection}>

          <div className={styles.creatorCard}>

            <div className={styles.avatar}>
              M
            </div>

            <h2>
              Meet Prajapati
            </h2>

            <p className={styles.role}>
              MERN Stack Developer 👨‍💻
            </p>

            <p className={styles.creatorText}>
              Creator of Mithaas 🍬 —
              a modern sweet shop web application built using the MERN stack.
            </p>

          </div>

        </div>

        {/* CONTACT SECTION */}
        <div className={styles.contactSection}>

          <h2>
            Contact Us
          </h2>

          <div className={styles.contactCards}>

            <div className={styles.contactCard}>
              <h3>📞 Phone</h3>

              <p>
                +91 9327202848
              </p>
            </div>

            <div className={styles.contactCard}>
              <h3>📧 Email</h3>

              <p>
                mp9569270@gmail.com
              </p>
            </div>

            <div className={styles.contactCard}>
              <h3>📍 Location</h3>

              <p>
                Vadodara, Gujarat
              </p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default About;