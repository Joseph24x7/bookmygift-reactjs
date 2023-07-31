import { useState, useCallback } from "react";
import axios from "axios";

const useAuth = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tokenResponse, setTokenResponse] = useState(null);

  const fetchUserInfo = useCallback(async (tokenResponse) => {
    try {
      const response = await axios.get("http://localhost:8082/user-info", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenResponse.access_token}`,
        },
      });

      console.log("fetchUserInfo response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetchUserInfo:", error.message);
      if (error.response) {
        return { errorDescription: error.response.data.errorDescription };
      } else {
        return {
          errorDescription: "Something went wrong. Try again after sometime.",
        };
      }
    }
  }, []);

  const loginWithAccessCode = async (email) => {
    console.log("loginWithAccessCode entered with email: ", email);
    try {
      await axios.post("http://localhost:8082/login-with-access-code", {
        email: email,
      });
    } catch (error) {
      console.error("loginWithAccessCode failed:", error);
      if (error.response) {
        return { errorDescription: error.response.data.errorDescription };
      } else {
        return {
          errorDescription: "Something went wrong. Try again after sometime.",
        };
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
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
        setIsEditing(false);
      });
  };

  return {
    tokenResponse,
    isEditing,
    setIsEditing,
    setTokenResponse,
    fetchUserInfo,
    updateUserInfo,
    loginWithAccessCode,
    verifyAccessCode,
  };
};

export default useAuth;
