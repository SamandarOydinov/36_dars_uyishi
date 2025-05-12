import React from "react";
import "./ReviewCard.scss";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; 
import { BsFillCheckCircleFill } from "react-icons/bs"; 
import { FiMoreHorizontal } from "react-icons/fi"; 


const renderStars = (currentRating, maxStars = 5) => {
  const stars = [];
  const fullStars = Math.floor(currentRating);
  const hasHalfStar = currentRating % 1 >= 0.4; 

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
    rating, 
    reviewerName, 
    isVerified, 
    reviewText, 
    datePosted, 
    
  } = review;

  
  
  const displayDate = `Posted on ${datePosted}`;

  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__stars">{renderStars(rating)}</div>
        <button
          className="review-card__more-options-btn"
          aria-label="More options"
          
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
