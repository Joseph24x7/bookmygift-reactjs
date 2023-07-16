// MyProfile.js
import React, { useState, useEffect } from "react";
import "./MyProfile.css"; // Import the CSS file for MyProfile component

const MyProfile = ({ tokenResponse }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserDetails, setEditedUserDetails] = useState({
    name: "", // Set default value for name
    email: "", // Set default value for email
    username: "", // Set default value for username
    mobile: "", // Set default value for mobile
    gender: "", // Set default value for gender
  });

  useEffect(() => {
    // Fetch user details and set initial editedUserDetails
    fetch("http://localhost:8082/user-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenResponse),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
        setIsLoading(false);
        setEditedUserDetails((prevDetails) => ({
          ...prevDetails,
          ...data, // Update only the existing fields from fetched data
        }));
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      });
  }, [tokenResponse]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    // Include tokenResponse along with edited user details
    const updatedData = {
      ...editedUserDetails,
      tokenResponse: tokenResponse,
    };

    // Make a backend API call to update the user details
    fetch("http://localhost:8082/update-user-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
        setIsEditing(false);
      });
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      {isLoading ? (
        <p>Loading user details...</p>
      ) : userDetails ? (
        <div className="user-details">
          <div className="form-item">
            <label htmlFor="name">Name:</label>
            {isEditing ? (
              <input type="text" id="name" name="name" value={editedUserDetails.name} onChange={handleInputChange} />
            ) : (
              <input type="text" id="name" value={userDetails.name} readOnly />
            )}
          </div>
          <div className="form-item">
            <label htmlFor="email">Email:</label>
            {isEditing ? (
              <input type="email" id="email" name="email" value={editedUserDetails.email} onChange={handleInputChange} />
            ) : (
              <input type="email" id="email" value={userDetails.email} readOnly />
            )}
          </div>
          <div className="form-item">
            <label htmlFor="username">Username:</label>
            {isEditing ? (
              <input type="text" id="username" name="username" value={editedUserDetails.username} onChange={handleInputChange} />
            ) : (
              <input type="text" id="username" value={userDetails.username} readOnly />
            )}
          </div>
          <div className="form-item">
            <label htmlFor="mobile">Mobile Number:</label>
            {isEditing ? (
              <input type="tel" id="mobile" name="mobile" value={editedUserDetails.mobile} onChange={handleInputChange} />
            ) : (
              <input type="tel" id="mobile" value={userDetails.mobile} readOnly />
            )}
          </div>
          <div className="form-item">
            <label htmlFor="gender">Gender:</label>
            {isEditing ? (
              <input type="text" id="gender" name="gender" value={editedUserDetails.gender} onChange={handleInputChange} />
            ) : (
              <input type="text" id="gender" value={userDetails.gender} readOnly />
            )}
          </div>
          {isEditing ? (
            <button className="profile-btn" onClick={handleUpdateClick}>
              Update
            </button>
          ) : (
            <button className="profile-btn" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>
      ) : (
        <p>Error fetching user details.</p>
      )}
    </div>
  );
};

export default MyProfile;
