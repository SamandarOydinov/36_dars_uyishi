import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import ProductDetails from "./pages/ProductDetails";
import { ToastContainer } from "react-toastify";

import HomePage from "./pages/Home";
import CategoryDetails from "./pages/Category/CategoryDetails";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/NotFound/NotFoundPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryDetails />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} /> {/* Savat sahifasi */}
          <Route path="*" element={<NotFoundPage/>} /> {/* Savat sahifasi */}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
