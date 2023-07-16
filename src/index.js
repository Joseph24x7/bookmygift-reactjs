import {
  GoogleOAuthProvider
} from "@react-oauth/google";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="103420507616-7a46i3etinqm6di5pon8h7aa7h0a8jng.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>,
);
reportWebVitals();
