import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import HomePage from "./pages/HomePage";
import MyProfile from "./pages/MyProfile";
import Banner from "./pages/Banner";

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

  // Call the useGoogleLogin hook and store the results in variables
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onLoginSuccess("login", tokenResponse),
  });

  const signUp = useGoogleLogin({
    onSuccess: (tokenResponse) => onLoginSuccess("signup", tokenResponse),
  });

  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <Banner
          onLoginClick={() => login()}
          onSignUpClick={() => signUp()}
          isLoggedIn={isLoggedIn}
          userDetails={userDetails}
          setIsLoggedIn={setIsLoggedIn}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="border-4 border-solid border-opacity-30 border-gray-300 rounded-full w-40 h-40 animate-spin mb-16"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-10">
            {error ? (
              <>
                <div className="bg-red-100 p-4 text-red-600 font-bold mt-40">
                  {error}
                </div>
                <button
                  onClick={() => login()}
                  className="bg-gray-800 text-white rounded-full px-6 py-3 text-lg shadow-md"
                >
                  Login
                </button>
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
