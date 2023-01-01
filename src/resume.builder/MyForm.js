// MyForm.js
import React, { useState } from 'react';
import './MyForm.css'; // Import the CSS file

function MyForm() {

  // Declaring variables
  const [url, setUrl] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Declare a function to handle the form change
  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  // Declare a function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    fetch('http://localhost:8080/getSuccessMessage', {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: { 'Content-Type': 'application/json' }
    })

    .then(res => res.text())
      .then(response => {
        setSuccessMessage(response);
        setShowSuccessMessage(true);
      })
      .catch(error => {
        console.error(error);
      });

  };

  return (
    <div className="container">
      <h1 className="title">Resume Builder</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <label>
            <p className="subtitle">Enter your LinkedIn URL :
              <input type="text" value={url} onChange={handleChange} className="textValue" />
              <input type="submit" value="Submit" /></p></label>
        </div>
      </form>
      {showSuccessMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default MyForm;