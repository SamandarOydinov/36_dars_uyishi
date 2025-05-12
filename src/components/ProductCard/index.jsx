import React from "react";
import "./ProductCard.scss";
// Yulduzchalar uchun ikonkalar (masalan, react-icons dan)
import { FaRegStar } from "react-icons/fa";
import { HalfStarIcon, StarIcon } from "../../assets/icons";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  if (!product) {
    return null; // Agar mahsulot ma'lumoti bo'lmasa, hech nima ko'rsatma
  }

  const {
    id,
    title,
    price,
    oldPrice,
    rating,
    // count, // Hozircha ishlatmaymiz, lekin kelajakda qo'shish mumkin
    images,
  } = product;

  const mainImage =
    images && images.length > 0
      ? images[0]
      : "https://via.placeholder.com/300x300?text=No+Image"; // Rasm bo'lmasa placeholder

  // Reyting yulduzchalarini render qilish uchun funksiya
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

  // Chegirma foizini hisoblash
  let discountPercentage = 0;
  if (oldPrice && price < oldPrice) {
    discountPercentage = Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  return (
    <Link to={`/products/${id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-card__image-container">
          <img src={mainImage} alt={title} className="product-card__image" />
          {discountPercentage > 0 && (
            <span className="product-card__discount-badge">
              -{discountPercentage}%
            </span>
          )}
        </div>
        <div className="product-card__content">
          <h3 className="product-card__title">{title}</h3>
          <div className="product-card__rating">
            {rating && (
              <>
                <div className="stars-wrapper">{renderStars(rating)}</div>
                <span className="rating-text">{rating.toFixed(1)}/5</span>
              </>
            )}
          </div>
          <div className="product-card__price-info">
            <span className="product-card__current-price">
              ${price.toFixed(2)}
            </span>
            {oldPrice && price < oldPrice && (
              <span className="product-card__old-price">
                ${oldPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
