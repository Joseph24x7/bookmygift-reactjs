import { useState, useCallback } from "react";
import axios from "axios";

const useAuth = () => {
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
  const [tokenResponse, setTokenResponse] = useState(null);

  const fetchUserInfo = useCallback(async (tokenResponse) => {
    try {
      const response = await axios.get("http://localhost:8082/user-info", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenResponse.access_token}`,
        },
      });

      const data = response.data;
      console.log("fetchUserInfo response:", data);
      setUserDetails(data);
      setIsLoggedIn(true);
      setError(null);
      return data;
    } catch (error) {
      console.error("Error fetchUserInfo:", error.message);
      setError(error.message);
    }
  }, []);

  const loginWithAccessCode = async (email) => {
    console.log("loginWithAccessCode entered with email: ", email);
    try {
      await axios.post("http://localhost:8082/login-with-access-code", {
        email: email,
      });
    } catch (error) {
      console.error("Error while making the email API call:", error);
      if (error.response && error.response.status === 400) {
        return { errorDescription: error.response.data.errorDescription };
      } else {
        return { error: error };
      }
    }
  };

  const verifyAccessCode = async (email, accessCode) => {
    try {
      const response = await axios.post(
        "http://localhost:8082/verify-access-code",
        {
          accessCode: accessCode,
          email: email,
        }
      );
      console.log("verifyAccessToken response:", response.data);
      return { accessToken: response.data };
    } catch (error) {
      console.error("Error while verifyAccessToken data:", error.response.data);
      if (error.response && error.response.status === 400) {
        return { errorDescription: error.response.data.errorDescription };
      } else {
        return { error: error };
      }
    }
  };

  const updateUserInfo = (editedUserDetails, tokenResponse) => {
    axios
      .put("http://localhost:8082/update-user-info", editedUserDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenResponse.access_token}`,
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
    error,
    isLoggedIn,
    userDetails,
    tokenResponse,
    isEditing,
    setIsEditing,
    setUserDetails,
    setTokenResponse,
    handleLogout,
    fetchUserInfo,
    updateUserInfo,
    loginWithAccessCode,
    verifyAccessCode,
  };
};

export default useAuth;
