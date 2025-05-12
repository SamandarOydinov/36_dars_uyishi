import React from "react";
import { useLocation } from "react-router-dom"; // useParams ni olib tashladim, chunki path dan categoryId ishlatilmayapti
import FilterSidebar from "./FilterSidebar";
import { Breadcrumbs, ProductCard } from "../../../components";
import { useProductsByCategory } from "../../../hooks";
import { parseQueryParams } from "../../../utils";

import "./CategoryDetails.scss";

const CategoryDetails = () => {
  const location = useLocation();
  const queryParams = parseQueryParams(location.search);

  // URL dan filter parametrlarini olamiz
  const currentCategory = queryParams?.category;
  const priceGte = queryParams?.price_gte;
  const priceLte = queryParams?.price_lte;
  const colorsParam = queryParams?.colors; // Bu "red,blue,green" kabi string bo'ladi
  // const sizeParam = queryParams?.size; // Kelajakda o'lcham uchun

  // Hookka uzatish uchun filterlar obyektini tayyorlaymiz
  const filtersForHook = {
    category: currentCategory,
    price_gte: priceGte !== undefined ? parseFloat(priceGte) : undefined,
    price_lte: priceLte !== undefined ? parseFloat(priceLte) : undefined,
    // colorsParam ni massivga aylantiramiz, agar mavjud bo'lsa
    colors: colorsParam ? colorsParam.split(",") : undefined,
    // size: sizeParam // Kelajakda
  };

  // Mahsulotlarni filterlar asosida olamiz
  const {
    data: products, // Hook endi to'g'ridan-to'g'ri filterlangan mahsulotlar massivini qaytaradi
    isLoading,
    isError,
    error,
  } = useProductsByCategory(filtersForHook);

  // Kategoriya nomini chiroyli formatlash uchun yordamchi funksiya
  const formatCategoryName = (name) => {
    if (!name) return "Products"; // Agar kategoriya bo'lmasa
    return name
      .replace(/-/g, " ") // chiziqchalarni bo'sh joyga almashtirish
      .replace(/\b\w/g, (l) => l.toUpperCase()); // Har bir so'zning birinchi harfini kattalashtirish
  };

  // Breadcrumbs uchun ma'lumotlar
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    // Agar kategoriya tanlangan bo'lsa, uni breadcrumbsga qo'shamiz
    // path dagi "/category/all" yoki shunga o'xshash narsani o'ylab topish kerak bo'ladi
    {
      label: formatCategoryName(currentCategory || "All Categories"),
      path: currentCategory
        ? `/category?category=${currentCategory}`
        : "/category", // Yoki sizning kategoriya sahifangizning asosiy yo'li
    },
  ];

  return (
    <div className="container category-details-page">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="category-details-content">
        <div className="category-details-content__sidebar">
          <FilterSidebar />
        </div>
        <div className="category-details-content__products">
          <div className="products-header">
            <h2>{formatCategoryName(currentCategory)}</h2>
            <div className="products-header__info">
              {/* Mahsulotlar sonini ko'rsatish */}
              {!isLoading && !isError && products && (
                <span>
                  Showing {products.length > 0 ? `1-${products.length}` : 0} of{" "}
                  {products.length} Products
                </span>
              )}
              {/* Sortlash select elementini keyinroq qo'shish mumkin */}
            </div>
          </div>

          {/* Yuklanish, xatolik va mahsulot topilmagan holatlari */}
          {isLoading && <p className="loading-text">Loading products...</p>}
          {isError && (
            <p className="error-text">
              Error loading products:{" "}
              {error?.message || "An unknown error occurred."}
            </p>
          )}
          {!isLoading && !isError && (!products || products.length === 0) && (
            <p className="no-products-text">
              No products found matching your criteria. Try adjusting the
              filters.
            </p>
          )}

          {/* Mahsulotlar ro'yxati */}
          <div className="products-grid">
            {/* `useProductsByCategory` endi to'g'ridan-to'g'ri filterlangan massivni qaytaradi */}
            {!isLoading &&
              !isError &&
              products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          {/* Paginatsiya komponenti bu yerga keladi (agar kerak bo'lsa) */}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
