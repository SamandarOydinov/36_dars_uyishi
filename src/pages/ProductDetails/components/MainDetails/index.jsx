import React, { useState, useEffect } from "react";
import "./MainDetails.scss";
import { FaRegStar, FaMinus, FaPlus } from "react-icons/fa";
import { HalfStarIcon, StarIcon } from "../../../../assets/icons";
import { FiCheck } from "react-icons/fi";
import { Button } from "../../../../components";

const renderStars = (currentRating) => {
  const stars = [];
  const fullStars = Math.floor(currentRating);
  const hasHalfStar = currentRating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarIcon key={`full-${i}`} className="star-icon filled" />);
  }
  if (hasHalfStar) {
    stars.push(<HalfStarIcon key="half" className="star-icon filled" />);
  }
  const emptyStarsCount = 5 - stars.length;
  for (let i = 0; i < emptyStarsCount; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="star-icon" />);
  }
  return stars;
};

const MainDetails = ({ product }) => {
  // product dan kerakli ma'lumotlarni olamiz, size ni ham
  const {
    id: productId, // Savatga qo'shish uchun
    title,
    price,
    oldPrice,
    rating,
    description,
    images = [],
    size: productSizes = [], // API dan keladigan o'lchamlar, "size" deb nomlangan
    // Hozircha availableColors statik qoladi, agar API dan kelsa, shuni ham product dan oling
    availableColors = [
      { name: "Olive Green", value: "#556B2F", code: "olive" },
      { name: "Deep Teal", value: "#008080", code: "teal" },
      { name: "Navy Blue", value: "#000080", code: "navy" },
    ],
  } = product || {}; // product undefined bo'lsa, bo'sh obyekt olamiz

  // State'larni boshlang'ich null yoki bo'sh qiymatlar bilan e'lon qilamiz
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 1. Mahsulot (product) o'zgarganda state'larni yangilash uchun useEffect
  useEffect(() => {
    if (product) {
      // product mavjudligini tekshiramiz
      // Rasmlarni o'rnatish
      if (images && images.length > 0) {
        setSelectedImage(images[0]);
      } else {
        setSelectedImage("https://via.placeholder.com/600x600?text=No+Image");
      }

      // Ranglarni o'rnatish (agar API dan kelmasa, statik qoladi)
      if (availableColors && availableColors.length > 0) {
        setSelectedColor(availableColors[0]?.code || null);
      } else {
        setSelectedColor(null);
      }

      // O'lchamlarni o'rnatish (API dan kelgan "productSizes" dan)
      if (productSizes && productSizes.length > 0) {
        // Agar "Large" mavjud bo'lsa, uni tanlaymiz, aks holda birinchisini
        setSelectedSize(
          productSizes.includes("Large") ? "Large" : productSizes[0] || null
        );
      } else {
        setSelectedSize(null);
      }

      // Miqdorni boshlang'ich holatga keltirish
      setQuantity(1);
    }
  }, [product]); // Bu useEffect faqat "product" o'zgarganda ishga tushadi

  const handleThumbnailClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleColorSelect = (colorCode) => {
    setSelectedColor(colorCode);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    if (!selectedColor && availableColors && availableColors.length > 0) {
      // Agar ranglar mavjud bo'lsa-yu tanlanmagan bo'lsa
      alert("Please select a color.");
      return;
    }
    console.log({
      productId: productId,
      title: title,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: price,
    });
    alert(
      `Added ${quantity} of ${title} (Size: ${selectedSize}${
        selectedColor ? `, Color: ${selectedColor}` : ""
      }) to cart!`
    );
  };

  // Agar product hali yuklanmagan bo'lsa, loading holatini ko'rsatish mumkin
  if (!product) {
    return <div>Loading product details...</div>; // Yoki skelet loader
  }

  let discountPercentage = 0;
  if (oldPrice && price < oldPrice) {
    discountPercentage = Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  return (
    <div className="main-details">
      <div className="main-details__gallery">
        <div className="main-details__thumbnails">
          {images.slice(0, 3).map((imgSrc, index) => (
            <div
              key={imgSrc || index} // Agar imgSrc unikal bo'lmasa, index ishlatish mumkin, lekin imgSrc yaxshiroq
              className={`thumbnail-item ${
                selectedImage === imgSrc ? "active" : ""
              }`}
              onClick={() => handleThumbnailClick(imgSrc)}
            >
              <img src={imgSrc} alt={`${title} thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="main-details__main-image">
          <img src={selectedImage} alt={title} />
        </div>
      </div>

      <div className="main-details__info">
        <h1 className="info__title">{title}</h1>

        <div className="info__rating-price">
          {rating !== undefined && rating !== null && (
            <div className="rating-stars">
              {renderStars(rating)}
              <span className="rating-value">{rating.toFixed(1)}/5</span>
            </div>
          )}
        </div>
        <div className="info__price">
          <span className="current-price">${price?.toFixed(2)}</span>
          {oldPrice && price < oldPrice && (
            <>
              <span className="old-price">${oldPrice.toFixed(2)}</span>
              <span className="discount-badge">-{discountPercentage}%</span>
            </>
          )}
        </div>

        <p className="info__description">{description}</p>

        {/* Rang tanlash */}
        {availableColors && availableColors.length > 0 && (
          <div className="info__options-group">
            <h3 className="options-label">Select Colors</h3>
            <div className="color-selector">
              {availableColors.map((color) => (
                <button
                  key={color.code}
                  className={`color-option ${
                    selectedColor === color.code ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorSelect(color.code)}
                  aria-label={`Select color ${color.name}`}
                  title={color.name}
                >
                  {selectedColor === color.code && (
                    <FiCheck className="check-icon" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* O'lcham tanlash (API dan kelgan productSizes dan foydalanamiz) */}
        {productSizes && productSizes.length > 0 && (
          <div className="info__options-group">
            <h3 className="options-label">Choose Size</h3>
            <div className="size-selector">
              {productSizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${
                    selectedSize === size ? "selected" : ""
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        <hr className="info__divider" />

        <div className="info__actions">
          <div className="quantity-selector">
            <button
              onClick={() => handleQuantityChange(-1)}
              aria-label="Decrease quantity"
            >
              <FaMinus />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              aria-label="Increase quantity"
            >
              <FaPlus />
            </button>
          </div>
          <Button size="large" px="140" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainDetails;
