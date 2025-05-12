import React from "react";
import "./ReviewCard.scss";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Yulduzchalar uchun
import { BsFillCheckCircleFill } from "react-icons/bs"; // Tasdiqlangan xaridor belgisi uchun
import { FiMoreHorizontal } from "react-icons/fi"; // "Ko'proq" belgisi uchun

// Reyting yulduzchalarini render qilish uchun funksiya (ProductCard dan ko'chirilgan)
const renderStars = (currentRating, maxStars = 5) => {
  const stars = [];
  const fullStars = Math.floor(currentRating);
  const hasHalfStar = currentRating % 1 >= 0.4; // 0.4 va undan yuqori bo'lsa yarim yulduzcha

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="star-icon filled" />);
  }
  if (hasHalfStar && stars.length < maxStars) {
    stars.push(<FaStarHalfAlt key="half" className="star-icon filled" />);
  }
  const emptyStarsCount = maxStars - stars.length;
  for (let i = 0; i < emptyStarsCount; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="star-icon" />);
  }
  return stars;
};

const ReviewCard = ({ review }) => {
  if (!review) {
    return null;
  }

  const {
    rating, // Raqam, masalan 3.5, 4
    reviewerName, // String, masalan "Ethan R."
    isVerified, // Boolean, true yoki false
    reviewText, // String, sharh matni
    datePosted, // String, masalan "August 16, 2023"
    // onMoreOptionsClick // Funksiya, ... tugmasi bosilganda
  } = review;

  // Sanani formatlash (agar kerak bo'lsa)
  // Hozircha string keladi deb qabul qilamiz
  const displayDate = `Posted on ${datePosted}`;

  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__stars">{renderStars(rating)}</div>
        <button
          className="review-card__more-options-btn"
          aria-label="More options"
          // onClick={onMoreOptionsClick} // Agar kerak bo'lsa
        >
          <FiMoreHorizontal />
        </button>
      </div>

      <div className="review-card__reviewer-info">
        <span className="review-card__reviewer-name">{reviewerName}</span>
        {isVerified && (
          <BsFillCheckCircleFill
            className="review-card__verified-icon"
            title="Verified Purchase"
          />
        )}
      </div>

      <p className="review-card__text">"{reviewText}"</p>

      <p className="review-card__date">{displayDate}</p>
    </div>
  );
};

export default ReviewCard;
