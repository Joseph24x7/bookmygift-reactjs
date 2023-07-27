import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import MyProfile from "./pages/Profile";
import Banner from "./pages/Banner";
import SignIn from "./pages/SignIn";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { isLoading, error, handleLogout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [tokenResponse, setTokenResponse] = useState(null);

  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <Banner
          isLoggedIn={isLoggedIn}
          userDetails={userDetails}
          handleLogout={handleLogout}
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
              <></>
            ) : (
              <Routes>
                <Route path="/sign-in" element={<SignIn setIsLoggedIn={setIsLoggedIn} setUserDetails={setUserDetails} setTokenResponse={setTokenResponse} />} />
                <Route
                  path="/*"
                  element={
                    isLoggedIn ? (
                      <Routes>
                        <Route path="/home" element={<HomePage userDetails={userDetails} handleLogout={handleLogout} tokenResponse={tokenResponse} />} />
                        <Route path="/profile" element={<MyProfile tokenResponse={tokenResponse} setTokenResponse={setTokenResponse} userDetails={userDetails} setUserDetails={setUserDetails} />} />
                      </Routes>
                    ) : (
                      <Navigate to="/sign-in" />
                    )
                  }
                />
              </Routes>
            )}
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
