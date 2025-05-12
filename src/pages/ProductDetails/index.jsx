import React from "react";
import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks"; // Hooks faylingizga yo'lni moslang
import "./ProductDetails.scss"; // Sahifa uchun maxsus stillar
import { MainDetails } from "./components";
import { Breadcrumbs } from "../../components";

const ProductDetailPage = () => {
  const { id } = useParams(); // URL dan id ni olamiz
  const { data: product, isLoading, isError, error } = useProductById(id);

  if (isLoading) {
    return (
      <div className="page-container product-detail-loading">
        Loading product details...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="page-container product-detail-error">
        Error loading product: {error?.message || "Product not found."}
      </div>
    );
  }

  // Breadcrumbs uchun ma'lumot (taxminiy)
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" }, // Yoki sizning do'kon sahifangiz
    {
      label: product.category || "Category",
      path: `/category/${product.category}`,
    }, // API dan kategoriya kelsa
    { label: product.title, path: `/products/${product.id}` },
  ];

  return (
    <div className="page-container product-detail-page">
      <Breadcrumbs items={breadcrumbItems} />
      <MainDetails product={product} />
      {/* Bu yerga ReviewCard, RelatedProducts kabi boshqa bo'limlarni qo'shishingiz mumkin */}
    </div>
  );
};

export default ProductDetailPage;
