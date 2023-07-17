import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import "./App.css";
import HomePage from "./components/HomePage";
import MyProfile from "./components/MyProfile";
import Banner from "./components/Banner";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenResponse, setTokenResponse] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    username: "",
    mobile: "",
    gender: "male",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLoginSuccess = (actionType, tokenResponse) => {
    console.log("tokenResponse:", tokenResponse);
    setTokenResponse(tokenResponse);

    // Call the appropriate web service based on actionType
    if (actionType === "login" || actionType === "signup") {
      setIsLoading(true);
      fetchUserInfo(actionType, tokenResponse);
    }
  };

  const fetchUserInfo = (actionType, tokenResponse) => {
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
        setError(error.message); // Set the error message from the caught error
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (tokenResponse) {
      setIsLoading(true);
      fetchUserInfo(tokenResponse);
    }
  }, [tokenResponse]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onLoginSuccess("login", tokenResponse),
  });

  const signUp = useGoogleLogin({
    onSuccess: (tokenResponse) => onLoginSuccess("signup", tokenResponse),
  });

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

  return (
    <Router>
      <div className="app-container">
        <Banner
          onLoginClick={() => login()}
          onSignUpClick={() => signUp()}
          isLoggedIn={isLoggedIn}
          userDetails={userDetails}
          setIsLoggedIn={setIsLoggedIn}
        />

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="buttons-container">
            {error ? (
              <>
                <div className="error-message">{error}</div>
                <button onClick={() => login()}>Login</button>
              </>
            ) : !isLoggedIn ? (
              <>
                {/* The login button functionality is now in Banner.js */}
                {/* Sign up button functionality is also in Banner.js */}
              </>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      editedUserDetails={userDetails}
                      handleLogout={handleLogout}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={<MyProfile tokenResponse={tokenResponse} />}
                />
                {/* Add more routes as needed */}
              </Routes>
            )}
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;