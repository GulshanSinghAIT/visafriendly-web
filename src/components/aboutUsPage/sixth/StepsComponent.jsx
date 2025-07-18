import React from 'react';
import './StepsComponent.css';

export function StepsComponent(){
  return (
    <div className="steps-container">
      <div className="header-section">
        <h1 className="main-title">Your Path to a Visa-Friendly Job in 4 Simple Steps</h1>
        <p className="sub-title">Join over 100 people who’ve landed jobs that fit their goals perfectly. Be next!</p>
      </div>
      <div className="stepsSection">
        <div className="step-card">
          <img src="./images/addUser.svg" alt="Subscribe" className="step-icon" />
          <h2 className="step-title">Subscribe to VisaFriendly</h2>
          <p className="step-info">5,000+ Users</p>
        </div>
        <div className="step-card">
          <img src="./images/fifthIcon.png" alt="Search" className="step-icon" />
          <h2 className="step-title">Search for Opportunities</h2>
          <p className="step-info">1000+ Jobs</p>
        </div>
        <div className="step-card">
          <img src="./images/capa.png" alt="Filter" className="step-icon" />
          <h2 className="step-title">Filter Visa-Friendly Jobs</h2>
          <p className="step-info">99% Accuracy</p>
        </div>
        <div className="step-card">
          <img src="./images/interview.jpg" alt="Submit" className="step-icon" />
          <h2 className="step-title">Submit Your Application</h2>
          <p className="step-info">Apply</p>
        </div>
      </div>
    </div>
  );
};

