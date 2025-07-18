import React from 'react';
import './ErrorPage.css';

export function ErrorPage ({ onGoHome, onPreviousPage }) {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="text-container">
          <h1 className="oops-text">Oops!</h1>
          <h2 className="error-message">404 - Page not found</h2>
        </div>
        <div className="button-container">
          <button className="home-button" onClick={onGoHome}>
            Go to Home
          </button>
          <button className="previous-button" onClick={onPreviousPage}>
            {'< Previous Page'}
          </button>
        </div>
      </div>
    </div>
  );
};

ErrorPage.defaultProps = {
  onGoHome: () => window.location.href = '/home',
  onPreviousPage: () => window.history.back()
};


