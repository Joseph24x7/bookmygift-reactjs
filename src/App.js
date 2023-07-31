import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/Home";
import MyProfile from "./pages/Profile";
import Banner from "./pages/Banner";
import SignIn from "./pages/SignIn";
import LoadingButton from "./hooks/LoadingButton";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [tokenResponse, setTokenResponse] = useState(null);

  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <Banner
          isLoggedIn={isLoggedIn}
          userDetails={userDetails}
          setIsLoggedIn={setIsLoggedIn}
        />

        {isLoading ? (
          <LoadingButton />
        ) : (
          <div className="flex flex-col items-center gap-10">
            <Routes>
              <Route
                path="/sign-in"
                element={
                  <SignIn
                    setIsLoggedIn={setIsLoggedIn}
                    setIsLoading={setIsLoading}
                    setUserDetails={setUserDetails}
                    setTokenResponse={setTokenResponse}
                  />
                }
              />
              <Route
                path="/*"
                element={
                  isLoggedIn ? (
                    <Routes>
                      <Route
                        path="/home"
                        element={
                          <HomePage
                            userDetails={userDetails}
                            tokenResponse={tokenResponse}
                          />
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <MyProfile
                            tokenResponse={tokenResponse}
                            setTokenResponse={setTokenResponse}
                            userDetails={userDetails}
                            setUserDetails={setUserDetails}
                          />
                        }
                      />
                    </Routes>
                  ) : (
                    <Navigate to="/sign-in" />
                  )
                }
              />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
