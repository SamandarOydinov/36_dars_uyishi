import React from 'react';
import './ProductCard.scss';

import { FaRegStar } from 'react-icons/fa';
import { HalfStarIcon, StarIcon } from '../../assets/icons';
import { Link, NavLink } from 'react-router';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const {
    id,
    title,
    price,
    oldPrice,
    rating,
    images,
  } = product;

  const mainImage =
    images && images.length > 0
      ? images[0]
      : 'https://via.placeholder.com/300x300?text=No+Image';

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
      stars.push(<NavLink to={`/productDetail/${product?.id}`}><FaRegStar key={`empty-${i}`} className="star-icon" /></NavLink>);
    }
    return stars;
  };

  let discountPercentage = 0;
  if (oldPrice && price < oldPrice) {
    discountPercentage = Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  return (
      <div className="product-card">
        <div className="product-card__image-container">
          <NavLink to={`product/${product?.id}`}>

          <img src={mainImage} alt={title} className="product-card__image" />
          </NavLink>

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
  );
};

export default ProductCard;
