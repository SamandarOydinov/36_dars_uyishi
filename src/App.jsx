import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import ProductDetails from "./pages/ProductDetails";
import { ToastContainer } from "react-toastify";

import HomePage from "./pages/Home";
import CategoryDetails from "./pages/Category/CategoryDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryDetails />} />
          <Route path="products/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
