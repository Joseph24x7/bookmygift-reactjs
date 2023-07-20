import React from "react";
import { Link } from "react-router-dom";

const Banner = ({
  onSignUpClick,
  onLoginClick,
  isLoggedIn,
  userDetails,
  setIsLoggedIn,
}) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div
      className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white shadow-md p-4"
      style={{ position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-4xl font-semibold">
            BookMyGift
          </Link>
          <div className="flex items-center gap-4 ml-8">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 text-lg rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="px-4 py-2 text-lg text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">
              Search
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <p className="font-semibold">Welcome {userDetails.name}</p>
              <button
                className="px-4 py-2 text-lg text-white bg-red-600 hover:bg-red-700 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 text-lg text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={onSignUpClick}
              >
                Sign up using Gmail
              </button>
              <button
                className="px-4 py-2 text-lg text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={onLoginClick}
              >
                Log in using Gmail
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
