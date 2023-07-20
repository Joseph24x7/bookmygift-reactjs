import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const { editedUserDetails } = props;
  const navigate = useNavigate();

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-600 my-10">
        Welcome, {editedUserDetails ? editedUserDetails.name : "User"}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        <div className="dashboard-item p-8 bg-white rounded-lg shadow-md border border-gray-300 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg" onClick={handleBrowseProducts}>
          <i className="text-4xl mb-4 text-blue-600 fas fa-shopping-cart"></i>
          <h2 className="text-2xl font-bold text-gray-800">Browse Products</h2>
          <p className="text-lg text-gray-600">Find your favorite products here.</p>
        </div>

        <div className="dashboard-item p-8 bg-white rounded-lg shadow-md border border-gray-300 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg" onClick={handleViewOrders}>
          <i className="text-4xl mb-4 text-purple-600 fas fa-list-ul"></i>
          <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
          <p className="text-lg text-gray-600">View your order history and status.</p>
        </div>

        <div className="dashboard-item p-8 bg-white rounded-lg shadow-md border border-gray-300 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg" onClick={handleManageProfile}>
          <i className="text-4xl mb-4 text-green-600 fas fa-user"></i>
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <p className="text-lg text-gray-600">Manage your profile information.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
