// MyForm.js
import React, { useState } from 'react';
import './MyForm.css'; // Import the CSS file

function MyForm() {

  // Declaring variables
  const [url, setUrl] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Declare an event handler function to update the "url" state variable when the user types in the text field
  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  // Declare a function to handle the form submission
  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Use the "url" state variable to do something with the entered URL, such as making an API call or navigating to a new page

    setShowSuccessMessage(true);
  };

  return (
    <div className="container">
      {showSuccessMessage && (
        <div className="success-message">
          Success! You have submitted the form.
        </div>
      )}
      <h1 className="title">Resume Builder</h1>
      <p className="subtitle">Enter your LinkedIn URL below:</p>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <label>
            <input type="text" value={url} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default MyForm;