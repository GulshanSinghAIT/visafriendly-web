import React from 'react';
import './CareerComponent.css';

export function CareerComponent()  {
  return (
    <div className="career-container">
      <div className="stats">
        <div className="stat-item">
          <div className="stat-number">10,000+</div>
          <div className="stat-description">Verified Job Listings</div>
          <hr></hr>
        </div>
        
        <div className="stat-item">
          <div className="stat-number">50,000+</div>
          <div className="stat-description">Visa-Supported Roles</div>
          <hr></hr>
        </div>
        <div className="stat-item">
          <div className="stat-number">95%</div>
          <div className="stat-description">User Satisfaction Rate</div>
        </div>
      </div>
      <div className="image-section">
        <img src="./images/career.png" alt="Career" className="career-image" />
      </div>
      <div className="info-section">
        <a href="#" className="about-link">About VisaFriendly</a>
        <h1>Your Gateway to Visa-Supported Career Opportunities Worldwide</h1>
        <p className="descriptionCareer">
          A dedicated job board connecting H-1B visa holders with top opportunities. Simplifying the search for visa-friendly roles tailored to your career goals.
        </p>
        <button className="sign-up-button">Sign Up</button>
      </div>
    </div>
  );
};



