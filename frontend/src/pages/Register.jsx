import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/AuthService";

import styles from "./Login.module.css";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await registerUser(formData);

      navigate("/login");

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
  <div className={styles.authContainer}>

    {/* DECORATIONS */}
    <div className={styles.topCircle}></div>
    <div className={styles.bottomCircle}></div>

    <div className={styles.authCard}>

      <h1>Mithaas 🍬</h1>

      <p>
        Create Your Sweet Account
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register
        </button>

      </form>

      <span>
        Already have an account?

        <Link to="/login">
          Login
        </Link>
      </span>

    </div>

  </div>
);
};

export default Register;