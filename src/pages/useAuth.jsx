import { useState, useCallback } from "react";

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

  const fetchUserInfo = useCallback(async (actionType, tokenResponse) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8082/user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Action-Type": actionType,
        },
        body: JSON.stringify(tokenResponse),
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

  return { isLoading, error, isLoggedIn, userDetails, tokenResponse, setUserDetails, setTokenResponse, setIsLoggedIn, handleLogout, fetchUserInfo }; // Add tokenResponse to the return object
};

export default useAuth;
