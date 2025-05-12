import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks"; 
import "./ProductDetails.scss"; 
import { MainDetails } from "./components";
import { Breadcrumbs } from "../../components";

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const { data: product, isLoading, isError, error } = useProductById(id);
  console.log(product);

  useEffect(() => {
    window.scroll(0, 0)
  }, [id])
  

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

  
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" }, 
    {
      label: product.category || "Category",
      path: `/category/${product.category}`,
    }, 
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
