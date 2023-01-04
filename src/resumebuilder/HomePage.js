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
  }

  // Declare a function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault() // Prevent the default form submission behavior

    if (!username || !summary || !mobile || !email) {
      setErrorMessage('All fields are required')
      setShowErrorMessage(true)
      return
    }

    fetch('http://localhost:8080/addorUpdateResumeDetails', {
      method: 'POST',
      body: JSON.stringify({ username, summary, mobile, email }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.text())
      .then((response) => {
        setShowSuccessMessage(true)
        setShowErrorMessage(false) // Reset the error message
      })
      .catch((error) => {
        setErrorMessage(error)
        setShowErrorMessage(true)
        setShowSuccessMessage(false) // Reset the success message
      })
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
          <div className="input-container">
            <label className="subtitle">
              {' '}
              Professional Summary :{' '}
              <input
                type="text"
                name="summary"
                value={summary}
                onChange={handleChange}
                className="textValue"
              />{' '}
            </label>
          </div>
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
          <div className="input-container">
            <label className="subtitle">
              <input type="submit" value="Submit" />
            </label>
          </div>
        </form>
      )}

      {showSuccessMessage && (
        <div>
          <label className="username">{username}</label>
          <label className="mobilenumber"><img className="mobilelogo" src={mobilelogo} alt="Mobile : " /> : {' '}  {mobile}</label>
          <label className="emailaddress"><img className="mobilelogo" src={emaillogo} alt="Email : " /> : {' '}  {email}</label>
          <hr />
          <div className="input-container">PROESSIONAL SUMMARY: </div><p className="summary">{summary}</p>
        </div>
      )}
      {showErrorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}

export default HomePage
