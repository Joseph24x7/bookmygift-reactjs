import React, { useState, useEffect } from "react";
import "./MyProfile.css"; // Import the CSS file for MyProfile component

const MyProfile = ({ tokenResponse }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserDetails, setEditedUserDetails] = useState({
    name: "",
    email: "",
    username: "",
    mobile: "",
    gender: "male",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = () => {
      setIsLoading(true);
      setError(null);

      fetch("http://localhost:8082/user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Action-Type": "update",
        },
        body: JSON.stringify(tokenResponse),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User details response:", data);
          setUserDetails(data);
          setIsLoading(false);
          setEditedUserDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          setIsLoading(false);
          setError("Error fetching user details.");
        });
    };

    fetchUserDetails();
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
    const updatedData = {
      ...editedUserDetails,
      tokenResponse: tokenResponse,
    };

    fetch("http://localhost:8082/update-user-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("updating user details response:", data);
        setUserDetails(data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
        setIsEditing(false);
        setError("Error updating user details.");
      });
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : userDetails ? (
        <div className="user-details">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={isEditing ? editedUserDetails.name : userDetails.name}
              onChange={handleInputChange}
              className={isEditing ? "editable-input" : "read-only-input"}
              readOnly={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={userDetails.email} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={isEditing ? editedUserDetails.username : userDetails.username}
              onChange={handleInputChange}
              className={isEditing ? "editable-input" : "read-only-input"}
              readOnly={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={isEditing ? editedUserDetails.mobile : userDetails.mobile}
              onChange={handleInputChange}
              className={isEditing ? "editable-input" : "read-only-input"}
              readOnly={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            {isEditing ? (
              <select
                id="gender"
                name="gender"
                value={editedUserDetails.gender}
                onChange={handleInputChange}
                className="editable-input"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <input type="text" id="gender" value={userDetails.gender} readOnly />
            )}
          </div>
          {isEditing ? (
            <button className="profile-btn update-btn" onClick={handleUpdateClick}>
              Update
            </button>
          ) : (
            <button className="profile-btn edit-btn" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>
      ) : (
        <p className="error-message">{error || "Error fetching user details."}</p>
      )}
    </div>
  );
};

export default MyProfile;
