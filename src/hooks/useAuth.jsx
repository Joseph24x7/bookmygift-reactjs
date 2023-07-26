import { useState, useCallback } from "react";
import axios from 'axios';

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
  
    console.log("Request Headers:", tokenResponse.access_token);
  
    try {
      const response = await axios.get("http://localhost:8082/user-info", {
        headers: {
          "Content-Type": "application/json",
          "X-Action-Type": actionType,
          Authorization: `${tokenResponse.access_token}`,
        },
      });
  
      const data = response.data;
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
    axios.put("http://localhost:8082/update-user-info", updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("updating user details response:", response.data);
        setUserDetails(response.data);
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
