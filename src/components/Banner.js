import React from "react";
import "./Banner.css"; // Import the updated Banner.css file

const Banner = ({ onLoginClick, isLoggedIn, editedUserDetails, handleSignUp, setIsLoggedIn }) => {
  return (
    <div className="banner">
      <div className="banner-left">
        <h1 className="banner-title">BookMyGift</h1>
        <div className="search-bar">
          {/* Add your search bar input and styling here */}
          {/* For example: */}
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </div>
      <div className="banner-right">
        {isLoggedIn ? (
          <>
            <p className="welcome-message">Welcome {editedUserDetails}</p>
            <button className="logout-button" onClick={() => setIsLoggedIn(false)}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="signup-button" onClick={handleSignUp}>
              Sign Up
            </button>
            <button className="login-gmail" onClick={onLoginClick}>
              Log in using Gmail
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
