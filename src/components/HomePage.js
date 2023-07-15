import React from "react";
import "./HomePage.css"; // Import the CSS file for HomePage

const HomePage = (props) => {
  const { decodedData, handleLogout } = props;

  return (
    <div>
      <h1 className="welcome-message">Welcome, {decodedData ? decodedData.name : "User"}!</h1>
      <div className="dashboard">
        <div className="dashboard-item">
          <h2>Browse Products</h2>
          <p>Find your favorite products here.</p>
          {/* You can add a link or button to navigate to the product browsing page */}
        </div>

        <div className="dashboard-item">
          <h2>My Orders</h2>
          <p>View your order history and status.</p>
          {/* You can add a link or button to navigate to the "My Orders" page */}
        </div>

        <div className="dashboard-item">
          <h2>My Profile</h2>
          <p>Manage your profile information.</p>
          {/* You can add a link or button to navigate to the "My Profile" page */}
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
