import React from 'react';
import './LoadingLogo.css';

export function LoadingLogo () {
  
  return (
    <div className='mainLoad'>
    <div className="visa-friendly-container">
      <div className="logo-header">
        <div className="logo-image">
          <img 
            src="./images/logo.png" 
            alt="Visa Friendly Logo"
            width={51.62}
            height={51.62}
          />
        </div>
        <h1 className="logo-text">VisaFriendly</h1>
      </div>
      <div className="loading-dots">
        <div className='dots1'></div>
        <div className='dots2'></div>
        <div className='dots3'></div>
        <div className='dots4'></div>
      </div>
    </div>
    </div>
  );
};




