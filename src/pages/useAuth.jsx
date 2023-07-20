import { useState } from "react";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchUserInfo = (actionType, tokenResponse) => {
    setIsLoading(true);

    fetch("http://localhost:8082/user-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Action-Type": actionType,
      },
      body: JSON.stringify(tokenResponse),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.errorDescription);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Apps User details response:", data);
        setUserDetails(data);
        setIsLoggedIn(true);
        setError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details.", error.message);
        setError(error.message);
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
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

  return { isLoading, error, isLoggedIn, userDetails, setTokenResponse, handleLogout, fetchUserInfo, tokenResponse }; // Add tokenResponse to the return object
};

export default useAuth;
