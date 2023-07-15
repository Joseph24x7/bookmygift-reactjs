import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setIsLoggedIn(true);
    },
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
