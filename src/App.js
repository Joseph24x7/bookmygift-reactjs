import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import HomePage from "./pages/HomePage";
import MyProfile from "./pages/MyProfile";
import Banner from "./pages/Banner";
import useAuth from "./pages/useAuth";

const App = () => {
  const {
    isLoading,
    error,
    isLoggedIn,
    userDetails,
    handleLogout,
    fetchUserInfo,
    setIsLoggedIn,
    setTokenResponse,
    tokenResponse,
  } = useAuth();

  const onLoginSuccess = (actionType, tokenResponse) => {
    console.log("tokenResponse:", tokenResponse);
    setTokenResponse(tokenResponse);

    if (
      actionType === "login" ||
      actionType === "signup" ||
      actionType === "view"
    ) {
      fetchUserInfo(actionType, tokenResponse);
    }
  };

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
          handleLogout={handleLogout}
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
                  element={<MyProfile tokenResponse={tokenResponse} />} // Corrected to use tokenResponse from useAuth hook
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
