import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/AuthService";

import styles from "./Login.module.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const response = await loginUser(formData);

      localStorage.setItem(
      "token",
      response.token
    );

    localStorage.setItem(
  "user",
  JSON.stringify(response.user)
);

      alert("Login Successful 🍬");

      navigate("/home");

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
        Welcome Back Sweet Lover
      </p>

      <form onSubmit={handleSubmit}>

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
          placeholder="Enter Your Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

      <span>
        New here?

        <Link to="/register">
          Create Account
        </Link>
      </span>

    </div>

  </div>
);
};

export default Login;