// HomePage.js
import React, { useState } from 'react'
import './HomePage.css' // Import the CSS file
import mobilelogo from './mobile-logo.png'
import emaillogo from './email-logo.png'

function HomePage() {
  // Declaring variables
  const [username, setUsername] = useState('')
  const [summary, setSummary] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showContactDetails, setShowContactDetails] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  // Declare a function to handle the form change
  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    } else if (event.target.name === 'summary') {
      setSummary(event.target.value)
    } else if (event.target.name === 'mobile') {
      setMobile(event.target.value)
    } else if (event.target.name === 'email') {
      setEmail(event.target.value)
    }

    if (event.target.name === 'username' && event.target.value != null) {
      setShowContactDetails(true)
    }

    if (
      (event.target.name === 'mobile' && event.target.value != null) ||
      (event.target.name === 'email' && event.target.value != null)
    ) {
      setShowSummary(true)
    }

  }

  // Declare a function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault() // Prevent the default form submission behavior

    if (!username || !summary || !mobile || !email) {
      setErrorMessage('All fields are required')
      setShowErrorMessage(true)
    } else {
      setShowSuccessMessage(true)
      setShowErrorMessage(false)
    }
  }

  return (
    <div className="container">
      {!showSuccessMessage && (
        <form onSubmit={handleSubmit} className="form">
          <h1 className="title">Resume Builder</h1>
          <div className="input-container">
            <label className="subtitle">
              Name :{' '}
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                className="textValue"
              />{' '}
            </label>
          </div>

          {showContactDetails && (
            <div>
              <div className="input-container">
                <label className="subtitle">
                  {' '}
                  Mobile Number :{' '}
                  <input
                    type="text"
                    name="mobile"
                    value={mobile}
                    onChange={handleChange}
                    className="textValue"
                  />
                </label>
              </div>
              <div className="input-container">
                <label className="subtitle">
                  {' '}
                  Email Number :{' '}
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="textValue"
                  />
                </label>
              </div>

              {showSummary && (
                <div>
                  <div className="input-container">
                    <label className="subtitle">
                      Professional Summary :{' '}
                      <textarea
                        name="summary"
                        value={summary}
                        onChange={handleChange}
                        className="summarytextarea"
                        maxLength="1000"
                      />
                    </label>
                  </div>
                  <div className="input-container">
                    <label className="subtitle">
                      <input type="submit" value="Submit" />
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      )}

      {showSuccessMessage && (
        <div>
          <label className="username">{username}</label>
          <label className="mobilenumber">
            <img className="mobilelogo" src={mobilelogo} alt="Mobile : " /> :{' '}
            {mobile}
          </label>
          <label className="emailaddress">
            <img className="mobilelogo" src={emaillogo} alt="Email : " /> :{' '}
            {email}
          </label>
          <hr />
          <div className="input-container">PROESSIONAL SUMMARY: </div>
          <div style={{ whiteSpace: 'pre-line' }}>
            <p className="summary">
              <ul>
                {summary.split('\n').map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </p>
          </div>
        </div>
      )}
      {showErrorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}

export default HomePage
