import { useState, useCallback } from "react";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    username: "",
    mobile: "",
    gender: "male",
  });
  const [tokenResponse, setTokenResponse] = useState(null); // Add tokenResponse state

  const fetchUserInfo = useCallback(async (actionType, tokenResponse) => {
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:8082/user-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Action-Type": actionType,
          Authorization: `${tokenResponse.access_token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorDescription);
      }
  
      const data = await response.json();
      console.log("Apps User details response:", data);
      setUserDetails(data);
      setIsLoggedIn(true);
      setError(null);
      setIsLoading(false);
      return data; // Return the userDetails data from the hook
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  const updateUserInfo = (updatedData) => {
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

  const handleLogout = () => {
    console.log("handleLogoutClick clicked!");
    setIsLoggedIn(false);
    setTokenResponse(null);
    setUserDetails({
      name: "",
      email: "",
      username: "",
      mobile: "",
      gender: "male",
    });
  };

  return {
    isLoading,
    error,
    isLoggedIn,
    userDetails,
    tokenResponse,
    isEditing,
    setIsLoading,
    setIsEditing,
    setUserDetails,
    setTokenResponse,
    setIsLoggedIn,
    handleLogout,
    fetchUserInfo,
    updateUserInfo,
  }; // Add tokenResponse to the return object
};

export default useAuth;
