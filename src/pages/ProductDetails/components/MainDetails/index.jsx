
import React, { useState, useEffect, memo } from 'react';
import './MainDetails.scss'; 
import { FaRegStar, FaMinus, FaPlus } from 'react-icons/fa';
import { HalfStarIcon, StarIcon } from '../../../../assets/icons';
import { FiCheck } from 'react-icons/fi';
import { Button } from '../../../../components'; 
import { useCart } from '../../../../context/CartContext';
import { toast } from 'react-toastify';


const renderStars = (currentRating) => {
  const stars = [];
  if (
    typeof currentRating !== 'number' ||
    currentRating < 0 ||
    currentRating > 5
  ) {
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaRegStar key={`empty-placeholder-${i}`} className="star-icon" />,
      );
    }
    return stars;
  }
  const fullStars = Math.floor(currentRating);
  const hasHalfStar = currentRating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarIcon key={`full-${i}`} className="star-icon filled" />);
  }
  if (hasHalfStar && stars.length < 5) {
    stars.push(<HalfStarIcon key="half" className="star-icon filled" />);
  }
  const emptyStarsCount = 5 - stars.length;
  for (let i = 0; i < emptyStarsCount; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="star-icon" />);
  }
  return stars;
};

const MainDetails = memo(({ product }) => {
  const { addToCart } = useCart();

  const {
    id: productId,
    title,
    price,
    oldPrice,
    rating,
    description,
    images = [],
    size: productSizes = [],
    colors: productColorsAPI = [],
  } = product || {};

  const defaultStaticColors = [
    { name: 'Dark Olive', value: '#4F5442', code: 'dark-olive-detail' },
    { name: 'Deep Navy', value: '#3B425A', code: 'deep-navy-detail' },
    { name: 'Steel Blue', value: '#607D8B', code: 'steel-blue-detail' },
  ];

  const availableColors =
    productColorsAPI && productColorsAPI.length > 0
      ? productColorsAPI
      : defaultStaticColors;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(
        images && images.length > 0
          ? images[0]
          : 'https://via.placeholder.com/600x600?text=No+Image',
      );

      const currentAvailableColors =
        productColorsAPI && productColorsAPI.length > 0
          ? productColorsAPI
          : defaultStaticColors;
      setSelectedColor(
        currentAvailableColors && currentAvailableColors.length > 0
          ? currentAvailableColors[0]?.code || null
          : null,
      );

      if (productSizes && productSizes.length > 0) {
        const defaultSize = productSizes.includes('M')
          ? 'M'
          : productSizes.includes('L')
            ? 'L'
            : productSizes.includes('XL')
              ? 'XL'
              : productSizes.includes('S')
                ? 'S'
                : productSizes[0] || null;
        setSelectedSize(defaultSize);
      } else {
        setSelectedSize(null);
      }
      setQuantity(1);
    } else {
      setSelectedImage(null);
      setSelectedColor(null);
      setSelectedSize(null);
      setQuantity(1);
    }
  }, [product]); 

  const handleThumbnailClick = (imageSrc) => setSelectedImage(imageSrc);
  const handleColorSelect = (colorCode) => setSelectedColor(colorCode);
  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleAddToCart = () => {
    if (productSizes && productSizes.length > 0 && !selectedSize) {
      toast.error(`Iltimos o'lchamini kiriting.`);
      return;
    }
    if (availableColors && availableColors.length > 0 && !selectedColor) {
      toast.error(`Iltimos rangini kiriting.`);
      return;
    }

    const productToAdd = {
      productId: productId,
      title: title,
      price: price,
      images: images,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };
    console.log('MainDetails: Product to add to cart:', productToAdd);
    addToCart(productToAdd);
  };

  if (!product) {
    return (
      <div
        className="loading-details"
        style={{ padding: '40px', textAlign: 'center' }}
      >
        Loading product details...
      </div>
    );
  }

  let discountPercentage = 0;
  if (
    typeof oldPrice === 'number' &&
    typeof price === 'number' &&
    price < oldPrice &&
    oldPrice > 0
  ) {
    discountPercentage = Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  return (
    <div className="main-details">
      <div className="main-details__gallery">
        <div className="main-details__thumbnails">
          {(images || []).slice(0, 3).map((imgSrc, index) => (
            <div
              key={imgSrc || `thumb-${index}-${productId}`}
              className={`thumbnail-item ${
                selectedImage === imgSrc ? 'active' : ''
              }`}
              onClick={() => handleThumbnailClick(imgSrc)}
            >
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={`${title || 'Product'} thumbnail ${index + 1}`}
                />
              ) : (
                <div
                  className="thumbnail-placeholder"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: '#ccc',
                  }}
                >
                  ?
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="main-details__main-image">
          {selectedImage ? (
            <img src={selectedImage} alt={title || 'Product main image'} />
          ) : (
            <img
              src="https://via.placeholder.com/600x600?text=No+Image+Available"
              alt="Product image placeholder"
            />
          )}
        </div>
      </div>

      <div className="main-details__info">
        <h1 className="info__title">{title || 'Product Title'}</h1>
        {typeof rating === 'number' && rating >= 0 && (
          <div className="info__rating-stars">
            {renderStars(rating)}
            <span className="rating-value">{rating.toFixed(1)}/5</span>
          </div>
        )}
        <div className="info__price">
          <span className="current-price">
            ${typeof price === 'number' ? price.toFixed(2) : 'N/A'}
          </span>
          {typeof oldPrice === 'number' && price < oldPrice && (
            <>
              <span className="old-price">${oldPrice.toFixed(2)}</span>
              {discountPercentage > 0 && (
                <span className="discount-badge">-{discountPercentage}%</span>
              )}
            </>
          )}
        </div>
        <p className="info__description">
          {description || 'No description available.'}
        </p>
        {availableColors && availableColors.length > 0 && (
          <div className="info__options-group">
            <h3 className="options-label">Select Color</h3>
            <div className="color-selector">
              {availableColors.map((color) => (
                <button
                  key={color.code}
                  className={`color-option ${
                    selectedColor === color.code ? 'selected' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorSelect(color.code)}
                  aria-label={`Select color ${color.name || color.code}`}
                  title={color.name || color.code}
                >
                  {selectedColor === color.code && (
                    <FiCheck className="check-icon" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        {productSizes && productSizes.length > 0 && (
          <div className="info__options-group">
            <h3 className="options-label">Choose Size</h3>
            <div className="size-selector">
              {['M', 'L', 'XL', 'S']
                .filter((size) => productSizes.includes(size))
                .map(
                  (
                    size, 
                  ) => (
                    <button
                      key={size}
                      className={`size-option ${
                        selectedSize === size ? 'selected' : ''
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ),
                )}
            </div>
          </div>
        )}
        {(availableColors?.length > 0 || productSizes?.length > 0) && (
          <hr className="info__divider" />
        )}
        <div className="info__actions">
          <div className="quantity-selector">
            <button
              onClick={() => handleQuantityChange(-1)}
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
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
          <Button
            type="primary"
            size="large"
            onClick={handleAddToCart}
            style={{ flexGrow: 1 }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
});

export default MainDetails;
