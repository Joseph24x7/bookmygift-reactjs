import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

export default function MyProfile({ userDetails, setUserDetails }) {
  const location = useLocation();
  const tokenResponse = location.state?.tokenResponse || null;
  const [errorMessage, setErrorMessage] = useState("");
  const [editedUserDetails, setEditedUserDetails] = useState({
    ...userDetails,
    gender: "Male",
  });
  const { updateUserInfo, isLoading, isEditing, setIsEditing } = useAuth();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setEditedUserDetails({ ...userDetails, gender: "Male" });
  }, [isEditing, userDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateClick = async (tokenResponse) => {
    setErrorMessage("");
    try {
      const response = await updateUserInfo(editedUserDetails, tokenResponse);
      if (response && response.errorDescription) {
        console.log("handleUpdateClick error response:", response);
        setErrorMessage(response.errorDescription);
        setIsEditing(true);
      } else {
        setUserDetails(editedUserDetails);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("handleUpdateClick error:", error);
    }
  };

  return (
    <div className="profile-container bg-gray-100 p-5 rounded-lg shadow-md w-400 mx-auto">
      <h2 className="profile-title text-center text-3xl font-semibold mb-5 text-blue-700">
        My Profile
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center mb-8">
          <div className="loading-spinner border-4 border-solid border-blue-400 border-t-4 h-8 w-8 rounded-full animate-spin"></div>
        </div>
      ) : userDetails ? (
        <div
          className="scroll-container"
          style={{ height: "450px", overflow: "auto" }}
        >
          <div className="user-details">
            <div className="form-group mb-4">
              <label htmlFor="name" className="font-semibold text-gray-600">
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={isEditing ? editedUserDetails.name : userDetails.name}
                onChange={handleInputChange}
                className={`form-input ${
                  isEditing ? "bg-white" : "bg-gray-200"
                } w-full px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-blue-500 focus:border-blue-700"
                    : "border-gray-300"
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email" className="font-semibold text-gray-600">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={userDetails.email}
                className="form-input bg-gray-200 w-full px-4 py-2 rounded-md border border-gray-300"
                readOnly
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="username" className="font-semibold text-gray-600">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={
                  isEditing ? editedUserDetails.username : userDetails.username
                }
                onChange={handleInputChange}
                className={`form-input ${
                  isEditing ? "bg-white" : "bg-gray-200"
                } w-full px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-blue-500 focus:border-blue-700"
                    : "border-gray-300"
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="mobile" className="font-semibold text-gray-600">
                Mobile Number:
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={
                  isEditing ? editedUserDetails.mobile : userDetails.mobile
                }
                onChange={handleInputChange}
                className={`form-input ${
                  isEditing ? "bg-white" : "bg-gray-200"
                } w-full px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-blue-500 focus:border-blue-700"
                    : "border-gray-300"
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="gender" className="font-semibold text-gray-600">
                Gender:
              </label>
              {isEditing ? (
                <select
                  id="gender"
                  name="gender"
                  value={
                    isEditing ? editedUserDetails.gender : userDetails.gender
                  }
                  onChange={handleInputChange}
                  className="form-select w-full px-4 py-2 rounded-md border border-gray-300"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Rather not say">Rather not say</option>
                </select>
              ) : (
                <input
                  type="text"
                  id="gender"
                  value={userDetails.gender}
                  className="form-input bg-gray-200 w-full px-4 py-2 rounded-md border border-gray-300"
                  readOnly
                />
              )}
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="addressLine1"
                className="font-semibold text-gray-600"
              >
                Address Line 1:
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={
                  isEditing
                    ? editedUserDetails.addressLine1
                    : userDetails.addressLine1
                }
                onChange={handleInputChange}
                className={`form-input ${
                  isEditing ? "bg-white" : "bg-gray-200"
                } w-full px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-blue-500 focus:border-blue-700"
                    : "border-gray-300"
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="addressLine2"
                className="font-semibold text-gray-600"
              >
                Address Line 2:
              </label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={
                  isEditing
                    ? editedUserDetails.addressLine2
                    : userDetails.addressLine2
                }
                onChange={handleInputChange}
                className={`form-input ${
                  isEditing ? "bg-white" : "bg-gray-200"
                } w-full px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-blue-500 focus:border-blue-700"
                    : "border-gray-300"
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="postalCode"
                className="font-semibold text-gray-600"
              >
                Postal Code:
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={
                  isEditing
                    ? editedUserDetails.postalCode
                    : userDetails.postalCode
                }
                onChange={handleInputChange}
                className={`form-input ${
                  isEditing ? "bg-white" : "bg-gray-200"
                } w-full px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-blue-500 focus:border-blue-700"
                    : "border-gray-300"
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="city" className="font-semibold text-gray-600">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={isEditing ? editedUserDetails.city : userDetails.city}
                onChange={handleInputChange}
                className={`form-input ${
                  isEditing ? "bg-white" : "bg-gray-200"
                } w-full px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-blue-500 focus:border-blue-700"
                    : "border-gray-300"
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="state" className="font-semibold text-gray-600">
                State:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={isEditing ? editedUserDetails.state : userDetails.state}
                onChange={handleInputChange}
                className={`form-input ${
                  isEditing ? "bg-white" : "bg-gray-200"
                } w-full px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-blue-500 focus:border-blue-700"
                    : "border-gray-300"
                }`}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="landmark" className="font-semibold text-gray-600">
                Landmark:
              </label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={
                  isEditing ? editedUserDetails.landmark : userDetails.landmark
                }
                onChange={handleInputChange}
                className={`form-input ${
                  isEditing ? "bg-white" : "bg-gray-200"
                } w-full px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-blue-500 focus:border-blue-700"
                    : "border-gray-300"
                }`}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </div>
      ) : null}
      {errorMessage && (
        <div className="form-group">
          <p className="error-message text-red-500">{errorMessage}</p>
        </div>
      )}
      <div className="flex justify-center mt-4">
        {isEditing ? (
          <button
            className="profile-btn update-btn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            onClick={() => handleUpdateClick(tokenResponse)}
          >
            Update
          </button>
        ) : (
          <button
            className="profile-btn edit-btn bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
