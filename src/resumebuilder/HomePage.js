// HomePage.js
import React, { useState } from 'react';
import './HomePage.css'; // Import the CSS file

function HomePage() {

  // Declaring variables
  const [username, setUsername] = useState('');
  const [summary, setSummary] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Declare a function to handle the form change
  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'summary') {
      setSummary(event.target.value);
    } else if (event.target.name === 'mobile') {
      setMobile(event.target.value);
    } else if (event.target.name === 'email') {
      setEmail(event.target.value);
    }
  };

  // Declare a function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!username || !summary || !mobile || !email) {
      setErrorMessage('All fields are required');
      setShowErrorMessage(true);
      return;
    }

    fetch('http://localhost:8080/getLinkedInDetails', {
      method: 'POST',
      body: JSON.stringify({ username, summary, mobile, email }),
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
      {!showSuccessMessage && (
        <form onSubmit={handleSubmit} className="form">
          <div className="input-container">
            <label className="subtitle">Name : <input type="text" name="username" value={username} onChange={handleChange} className="textValue" /> </label>
          </div>
          <div className="input-container">
            <label className="subtitle"> Professional Summary : <input type="text" name="summary" value={summary} onChange={handleChange} className="textValue" /> </label>
          </div>
          <div className="input-container">
            <label className="subtitle">  Mobile Number : <input type="text" name="mobile" value={mobile} onChange={handleChange} className="textValue" /></label>
          </div>
          <div className="input-container">
            <label className="subtitle">  Email Number : <input type="text" name="email" value={email} onChange={handleChange} className="textValue" /></label>
          </div>
          <div className="input-container">
            <label className="subtitle"><input type="submit" value="Submit" /></label>
          </div>
        </form>
      )
      }

      {showSuccessMessage && (
        <div className="success-message">
          {successMessage}
          <div className="input-container"><p>Username: <label className="response">{username}</label></p></div>
          <div className="input-container"><p>Summary: <label className="response">{summary}</label></p></div>
          <div className="input-container"><p>Mobile: <label className="response">{mobile}</label></p></div>
          <div className="input-container"><p>Email: <label className="response">{email}</label></p></div>
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