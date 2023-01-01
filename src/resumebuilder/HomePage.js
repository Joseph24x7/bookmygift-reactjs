// HomePage.js
import React, { useState } from 'react';
import './HomePage.css'; // Import the CSS file

function HomePage() {

  // Declaring variables
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Declare a function to handle the form change
  const handleChange = (event) => {
    if (event.target.name === 'url') {
      setUrl(event.target.value);
    } else if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  // Declare a function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!url || !username || !password) {
      setErrorMessage('All fields are required');
      setShowErrorMessage(true);
      return;
    }

    fetch('http://localhost:8080/getLinkedInDetails', {
      method: 'POST',
      body: JSON.stringify({ url, username, password }),
      headers: { 'Content-Type': 'application/json' }
    })

    .then(res => res.text())
    .then(response => {
      setSuccessMessage(response);
      setShowSuccessMessage(true);
      setShowErrorMessage(false); // Reset the error message
    })
    .catch(error => {
      setErrorMessage(error);
      setShowErrorMessage(true);
      setShowSuccessMessage(false); // Reset the success message
    });

  };

  return (
    <div className="container">
      <h1 className="title">Resume Builder</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <label className="subtitle"> Enter your LinkedIn URL : <input type="text" name="url" value={url} onChange={handleChange} className="textValue" /> </label>
        </div>
        <div className="input-container">
          <label className="subtitle"> LinkedIn Username : <input type="text" name="username" value={username} onChange={handleChange} className="textValue" /> </label>
        </div>
        <div className="input-container">
          <label className="subtitle">  LinkedIn Password : <input type="password" name="password" value={password} onChange={handleChange} className="textValue" /></label>
        </div>
        <div className="input-container">
          <label className="subtitle"><input type="submit" value="Submit" /></label>
        </div>
      </form>
      {showSuccessMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      {showErrorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default HomePage;