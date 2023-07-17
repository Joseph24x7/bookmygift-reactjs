// Banner.js
import React from "react";
import "./Banner.css"; // Import the updated Banner.css file
import { Link } from "react-router-dom";

const Banner = ({ onLoginClick, isLoggedIn, userDetails, setIsLoggedIn }) => {
  const handleLogout = () => {
    // Perform logout actions here, e.g., clearing state and tokens
    setIsLoggedIn(false);
  };

  return (
    <div className="banner">
      <div className="banner-left">
        <Link to="/" className="banner-title-button">
          BookMyGift
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="common-button">Search</button>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="banner-right">
          <p className="welcome-name">Welcome {userDetails.name}</p>
          <button className="common-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="banner-right">
          <button className="common-button" onClick={onLoginClick}>
            Sign up using Gmail
          </button>
          <button className="common-button" onClick={onLoginClick}>
            Log in using Gmail
          </button>
        </div>
      )}
    </div>
  );
};

export default Banner;
