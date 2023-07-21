import React from "react";
import useAuth from "../hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function SignIn({ setIsLoggedIn, setUserDetails }) {
    const { fetchUserInfo, setTokenResponse } = useAuth();
  
    const navigate = useNavigate();
  
    const onLoginSuccess = async (tokenResponse) => {
      console.log("tokenResponse:", tokenResponse);
      setTokenResponse(tokenResponse);
  
      try {
        const userData = await fetchUserInfo("login", tokenResponse);
        setUserDetails(userData);
        setIsLoggedIn(true);
        
        navigate("/");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    const login = useGoogleLogin({
      onSuccess: (tokenResponse) => onLoginSuccess(tokenResponse),
    });
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md sm:w-96 p-4 bg-white rounded-lg shadow-md">
          <div className="p-4 space-y-4">
            <h2 className="text-2xl font-semibold">SignIn</h2>
            <div>
              <label htmlFor="username" className="block font-medium">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
              Sign In
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-full h-px bg-gray-300"></div>
              <div>or</div>
              <div className="w-full h-px bg-gray-300"></div>
            </div>
            <button
              className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
              onClick={login}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }
  
