import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/productService";

import styles from "./Home.module.css";

const Home = () => {

  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    const data = await getProducts();
    setProducts(data || []);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  // FILTER PRODUCTS
  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* SEARCH SECTION */}
      <div className={styles.searchSection}>

        <input
          type="text"
          placeholder="Search sweets 🍬"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className={styles.searchInput}
        />

      </div>

      {/* PRODUCTS */}
      <div className={styles.productsGrid}>

  {loading ? (

    <h2 className={styles.noProducts}>
      Loading sweets 🍬...
    </h2>

  ) : filteredProducts.length > 0 ? (

    filteredProducts.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
      />
    ))

  ) : (

    <h2 className={styles.noProducts}>
      No sweets found 🍭
    </h2>

  )}

</div>
    </>
  );
};

export default Home;