import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import MyProfile from "./components/MyProfile";
import Banner from "./components/Banner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenResponse, setTokenResponse] = useState(null);
  const [editedUserDetails, setEditedUserDetails] = useState({
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
          setEditedUserDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching user details.", error);
        });
    }
  }, [tokenResponse]);

  const login = useGoogleLogin({
    onSuccess: onLoginSuccess,
  });

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log("Sign up button clicked!");
  };

  return (
    <Router>
      <div className="app-container">
        <Banner
          onLoginClick={login}
          isLoggedIn={isLoggedIn}
          editedUserDetails={editedUserDetails}
          handleSignUp={handleSignUp}
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
                    editedUserDetails={editedUserDetails}
                    handleLogout={() => setIsLoggedIn(false)}
                  />
                }
              />
              <Route
                path="/profile"
                element={<MyProfile tokenResponse={tokenResponse} />}
              />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;