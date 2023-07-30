import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function SignIn({
  setIsLoggedIn,
  setUserDetails,
  setTokenResponse,
  setIsLoading,
}) {
  const { fetchUserInfo, loginWithAccessCode, verifyAccessCode } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showAccessCodeInput, setShowAccessCodeInput] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  const onLoginSuccess = async (tokenResponse) => {
    setTokenResponse(tokenResponse);
    setIsLoading(true);
    try {
      const userData = await fetchUserInfo(tokenResponse);
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
      const response = await loginWithAccessCode(email);
      if (response && response.errorDescription) {
        console.log("handleEmailSubmit response:", response);
        setError(response.errorDescription);
        setShowAccessCodeInput(false);
      } else {
        setShowAccessCodeInput(true);
        setError("");
      }
    } catch (error) {
      console.error("Error while logging in with email:", error);
      setShowAccessCodeInput(false);
      setError("An error occurred while logging in with email.");
    }
  };

  const handleAccessCodeSubmit = async () => {
    try {
      const response = await verifyAccessCode(email, accessCode);

      if (response.accessToken) {
        onLoginSuccess({ access_token: response.accessToken });
      } else if (response.errorDescription) {
        setError(response.errorDescription);
      }
    } catch (error) {
      console.error("Error while verifying access code:", error);
      setError("An error occurred while verifying access code.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onLoginSuccess(tokenResponse),
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md sm:w-96 p-4 bg-white rounded-lg shadow-md">
        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
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
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
              <button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                onClick={handleAccessCodeSubmit}
              >
                Submit Access Code
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
              {/* Display the error message if it exists */}
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
              {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
              {/* Display the error message if it exists */}
              <div className="flex items-center space-x-2 my-2">
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
