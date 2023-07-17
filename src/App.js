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

  const onLoginSuccess = (tokenResponse) => {
    console.log("tokenResponse:", tokenResponse);
    setIsLoggedIn(true);
    setTokenResponse(tokenResponse);
  };

  useEffect(() => {
    if (tokenResponse) {
      fetch("http://localhost:8082/user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tokenResponse),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Apps User details response:", data);
          setUserDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching user details.", error);
        });
    }
  }, [tokenResponse]);

  const login = useGoogleLogin({
    onSuccess: onLoginSuccess,
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
          onLoginClick={login}
          isLoggedIn={isLoggedIn}
          userDetails={userDetails}
          setIsLoggedIn={setIsLoggedIn}
        />

        <div className="buttons-container">
          {!isLoggedIn ? (
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
      </div>
    </Router>
  );
};

export default App;
