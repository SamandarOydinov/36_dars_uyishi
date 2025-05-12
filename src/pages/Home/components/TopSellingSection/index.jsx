import React from "react";
import "./TopSelling.scss";
import { BiSolidStar } from "react-icons/bi";
import { useAllProducts } from "../../../../hooks";
import { MainTitle, ProductCard } from "../../../../components";

function TopSelling() {
  const { data: products, isLoading, isError, error } = useAllProducts();

  if (isLoading) {
    return (
      <div className="container">
        <div className="top-sellings-item">
          <MainTitle title="TOP SELLING" />
        </div>
        <p>Loading top sellings...</p>
        <hr />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container">
        <div className="top-sellings-item">
          <MainTitle title="TOP SELLING" />
        </div>
        <p>
          Error fetching products:{" "}
          {error?.message || "An unknown error occurred"}
        </p>
        <hr />
      </div>
    );
  }

  return (
    <div className="container top-sellings-section">
      {" "}
      {/* Umumiy section uchun class qo'shdim */}
      <div className="top-sellings-header">
        {" "}
        {/* Sarlavha va button uchun alohida div */}
        <MainTitle title="TOP SELLING" />
        {/* Bu tugma keyinchalik barcha mahsulotlar sahifasiga o'tish uchun ishlatilishi mumkin */}
      </div>
      <div className="item-cards">
        {products && products.length > 0 ? (
          // Masalan, faqat birinchi 4 ta yangi mahsulotni ko'rsatamiz
          products
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <p>No new arrivals found.</p> // Agar mahsulotlar bo'lmasa
        )}
        <button className="view-all-btn">View All</button>
      </div>
      <hr className="section-divider" /> {/* Chiziq uchun class qo'shdim */}
    </div>
  );
}

export default TopSelling;
