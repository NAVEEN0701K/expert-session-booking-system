import React from 'react';
import './ExpertCard.css';

const ExpertCard = ({ expert, onClick }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  return (
    <div className="expert-card" onClick={() => onClick(expert._id)}>
      <div className="expert-header">
        <h3 className="expert-name">{expert.name}</h3>
        <span className="expert-category">{expert.category}</span>
      </div>
      
      <div className="expert-details">
        <div className="expert-rating">
          <span className="stars">{renderStars(expert.rating)}</span>
          <span className="rating-value">({expert.rating.toFixed(1)})</span>
        </div>
        
        <div className="expert-experience">
          <span className="experience-label">Experience:</span>
          <span className="experience-value">{expert.experience} years</span>
        </div>
      </div>
      
      <div className="expert-bio">
        <p>{expert.bio.substring(0, 150)}{expert.bio.length > 150 ? '...' : ''}</p>
      </div>
      
      <button className="view-details-btn">
        View Details →
      </button>
    </div>
  );
};

export default ExpertCard;
