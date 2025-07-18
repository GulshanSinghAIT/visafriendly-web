import React from 'react';
import './ErrorPage.css';
import { useNavigate } from 'react-router-dom';

export function ErrorPage_Login () {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="text-container">
          <h1 className="oops-text">Oops!</h1>
          <h2 className="error-message">It seems you are not logged in</h2>
        </div>
        <div className="button-container">
          <button className="home-button" onClick={handleLogin}>
            Login
          </button>
          {/* <button className="previous-button" onClick={onPreviousPage}>
            {'< Previous Page'}
          </button> */}
        </div>
      </div>
    </div>
  );
};

