import {
  BrowserRouter,
  Routes,
  Route
}
from "react-router-dom";

import Landing from "./pages/Landing";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Profile from "./pages/Profile";

import Cart from "./pages/Cart";

import About from "./pages/About";

import Orders from "./pages/Orders"

import ProductDetails
from "./pages/ProductDetails";

import Admin from "./pages/Admin";

import AdminRoute from "./components/AdminRoute";


import AddProduct from "./pages/AddProduct";

import ManageProducts from "./pages/ManageProducts";

import EditProduct from "./pages/EditProduct";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LANDING PAGE */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* HOME */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/orders" element={<Orders />} />

        <Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>

<Route
  path="/admin/add-product"
  element={
    <AdminRoute>
      <AddProduct />
    </AdminRoute>
  }
/>

<Route
  path="/admin/manage-products"
  element={
    <AdminRoute>
      <ManageProducts />
    </AdminRoute>
  }
/>

<Route
  path="/admin/edit-product/:id"
  element={
    <AdminRoute>
      <EditProduct />
    </AdminRoute>
  }
/>



      </Routes>

    </BrowserRouter>
  );
}

export default App;