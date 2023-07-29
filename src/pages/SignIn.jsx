import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function SignIn({
  setIsLoggedIn,
  setUserDetails,
  setTokenResponse,
  setIsLoading
}) {

  const { fetchUserInfo, loginWithAccessCode, verifyAccessCode  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showAccessCodeInput, setShowAccessCodeInput] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const onLoginSuccess = async (tokenResponse) => {
    setTokenResponse(tokenResponse);
    setIsLoading(true);
    try {
      const userData = await fetchUserInfo("login", tokenResponse);
      setIsLoading(false);
      setUserDetails(userData);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching user details:", error);
    }
  };

  const handleEmailSubmit = async () => {
    try {
      await loginWithAccessCode(email);
      setShowAccessCodeInput(true);
    } catch (error) {
      console.error("Error while logging in with email:", error);
    }
  };

  const handleAccessCodeSubmit = async () => {
    const accessToken = await verifyAccessCode(email, accessCode);
    if (accessToken) {
      onLoginSuccess({ access_token: accessToken }); // Assuming the response contains an access_token property.
    } else {
      console.error("Invalid access code");
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
          {showAccessCodeInput ? (
            <div>
              <label htmlFor="accessCode" className="block font-medium">
                Access Code:
              </label>
              <input
                type="text"
                id="accessCode"
                name="accessCode"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
              <button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                onClick={handleAccessCodeSubmit}
              >
                Submit Access Code
              </button>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="username" className="block font-medium">
                  Email:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                onClick={handleEmailSubmit}
              >
                Continue with email
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}