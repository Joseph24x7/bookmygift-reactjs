import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage({ userDetails }) {
  const navigate = useNavigate();

  const DashboardCard = ({ iconClassName, title, description, onClick }) => (
    <div
      className="dashboard-card p-8 bg-white rounded-lg shadow-md border border-gray-300 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      <i className={`text-4xl mb-4 ${iconClassName}`} />
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );

  const handleBrowseProducts = () => {
    console.log("Browse Products clicked!");
  };

  const handleViewOrders = () => {
    console.log("View Orders clicked!");
  };

  const handleManageProfile = () => {
    console.log("Manage Profile clicked!");
    navigate(`/profile`);
  };

  const welcomeMessage = `Welcome, ${userDetails ? userDetails.name : "User"}!`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-600 my-10">
        {welcomeMessage}
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 w-full max-w-3xl">
        <DashboardCard
          iconClassName="text-blue-600 fas fa-shopping-cart"
          title="Browse Products"
          description="Find your favorite products here."
          onClick={handleBrowseProducts}
        />
        <DashboardCard
          iconClassName="text-purple-600 fas fa-list-ul"
          title="My Orders"
          description="View your order history and status."
          onClick={handleViewOrders}
        />
        <DashboardCard
          iconClassName="text-green-600 fas fa-user"
          title="My Profile"
          description="Manage your profile information."
          onClick={handleManageProfile}
        />
      </div>
    </div>
  );
}
