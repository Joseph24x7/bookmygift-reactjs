import React from "react";
import { useNavigate } from "react-router-dom"; // Import the necessary hooks
import "./HomePage.css";

const HomePage = (props) => {
  const { editedUserDetails, handleLogout } = props;
  const navigate = useNavigate(); // Access the navigate function for navigation

  const handleBrowseProducts = () => {
    console.log("Browse Products clicked!");
    // Implement your navigation logic here for browsing products
  };

  const handleViewOrders = () => {
    console.log("View Orders clicked!");
    // Implement your navigation logic here for viewing orders
  };

  const handleManageProfile = () => {
    console.log("Manage Profile clicked!");
    // Navigate to the UserProfilePage component with the user's ID as a parameter
    navigate(`/profile`);
  };

  return (
    <div>
      <h1 className="welcome-message">Welcome, {editedUserDetails ? editedUserDetails.name : "User"}!</h1>
      <div className="dashboard">
        <div className="dashboard-item" onClick={handleBrowseProducts}>
          <h2>Browse Products</h2>
          <p>Find your favorite products here.</p>
        </div>

        <div className="dashboard-item" onClick={handleViewOrders}>
          <h2>My Orders</h2>
          <p>View your order history and status.</p>
        </div>

        <div className="dashboard-item" onClick={handleManageProfile}>
          <h2>My Profile</h2>
          <p>Manage your profile information.</p>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
