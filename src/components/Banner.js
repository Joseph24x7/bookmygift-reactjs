import React from "react";
import "./Banner.css"; // Import the updated Banner.css file

const Banner = ({
  onLoginClick,
  isLoggedIn,
  userDetails,
  handleSignUp,
  setIsLoggedIn,
}) => {
  return (
    <div className="banner">
      <div className="banner-left">
        <h1 className="banner-title">BookMyGift</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="common-button">Search</button>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="banner-right">
          <p className="welcome-name">Welcome {userDetails.name}</p>
          <button className="common-button" onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        </div>
      ) : (
        <div className="banner-right">
          <button className="common-button" onClick={handleSignUp}>
            Sign Up using Gmail
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
