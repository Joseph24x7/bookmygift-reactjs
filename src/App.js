import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import MyProfile from "./components/MyProfile";
import Banner from "./components/Banner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user details here
  const [tokenResponse, setTokenResponse] = useState(null);

  useEffect(() => {
    // Check if the user is redirected back from Gmail login
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Redirected back from Gmail login, set login status to true
      setIsLoggedIn(true);

      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);

      // Fetch user information (you might have your own API endpoint to fetch user data)
      fetch("http://localhost:8082/user-info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Store user details in the state
          setUser(data.user);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, []);

  const onLoginSuccess = (tokenResponse) => {
    console.log("tokenResponse:", tokenResponse);
    setIsLoggedIn(true);
    setTokenResponse(tokenResponse);
  };

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
          userName={user?.name} // Pass the user's name to the Banner component
          handleSignUp={handleSignUp} // Pass the handleSignUp function to the Banner component
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
                    decodedData={user}
                    handleLogout={() => setIsLoggedIn(false)}
                  />
                }
              />
              {/* Pass the tokenResponse to the MyProfile component */}
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
