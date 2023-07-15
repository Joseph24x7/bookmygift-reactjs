import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is redirected back from Gmail login
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Redirected back from Gmail login, set login status to true
      setIsLoggedIn(true);

      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const onLoginSuccess = (tokenResponse, userResponse) => {
    console.log("tokenResponse:", tokenResponse);

    setIsLoggedIn(true);
    setUser(userResponse);

    // Make a backend API call to persist user information
    fetch("http://localhost:8082/user-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any necessary authorization headers if required by your backend
        // For example, if using JWT, you might need to include the token
        // Authorization: `Bearer ${tokenResponse.access_token}`,
      },
      body: JSON.stringify(tokenResponse),
    })
      .then((response) => {
        // Handle the response from the backend if needed
        console.log("Success persisting user information:", response);
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error persisting user information:", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: onLoginSuccess,
  });

  return (
    <div className="app-container">
      <h1 className="app-title">Book My Gift</h1>
      <div className="buttons-container">
        {!isLoggedIn ? (
          <button className="login-gmail" onClick={login}>
            Log in using gmail
          </button>
        ) : (
          <HomePage />
        )}
      </div>
    </div>
  );
};

export default App;
