import React, { useState, useEffect } from "react";

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
    <div className="profile-container bg-gray-100 p-5 rounded-lg shadow-md w-96 mx-auto">
      <h2 className="profile-title text-center text-3xl font-semibold mb-5 text-blue-700">My Profile</h2>
      {isLoading ? (
        <div className="flex items-center justify-center mb-8">
          <div className="loading-spinner border-4 border-solid border-blue-400 border-t-4 h-8 w-8 rounded-full animate-spin"></div>
        </div>
      ) : userDetails ? (
        <div className="user-details">
          <div className="form-group mb-4">
            <label htmlFor="name" className="font-semibold text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={isEditing ? editedUserDetails.name : userDetails.name}
              onChange={handleInputChange}
              className={`form-input ${isEditing ? "bg-white" : "bg-gray-200"} w-full px-4 py-2 rounded-md border ${
                isEditing ? "border-blue-500 focus:border-blue-700" : "border-gray-300"
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
              value={isEditing ? editedUserDetails.username : userDetails.username}
              onChange={handleInputChange}
              className={`form-input ${isEditing ? "bg-white" : "bg-gray-200"} w-full px-4 py-2 rounded-md border ${
                isEditing ? "border-blue-500 focus:border-blue-700" : "border-gray-300"
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
              value={isEditing ? editedUserDetails.mobile : userDetails.mobile}
              onChange={handleInputChange}
              className={`form-input ${isEditing ? "bg-white" : "bg-gray-200"} w-full px-4 py-2 rounded-md border ${
                isEditing ? "border-blue-500 focus:border-blue-700" : "border-gray-300"
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
                value={editedUserDetails.gender}
                onChange={handleInputChange}
                className="form-select w-full px-4 py-2 rounded-md border border-gray-300"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
          <div className="flex justify-center mt-4">
            {isEditing ? (
              <button
                className="profile-btn update-btn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                onClick={handleUpdateClick}
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
      ) : (
        <p className="error-message text-red-500">
          {error || "Error fetching user details."}
        </p>
      )}
    </div>
  );
  
};

export default MyProfile;
