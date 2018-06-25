import React from 'react'
import PasswordsForm from './forms/PasswordsForm'
import PasswordResetsForm from './forms/PasswordResetsForm'

var Passwords = {
  New: (props) => (
    <div className="container">
      <h1 className="page-header">Confirm your email address </h1>
      <PasswordResetsForm handleChange={props.handleChange} />
    </div>
  ),
  Edit: (props) => (
    <div className="container">
      <h1 className="page-header">Enter a new password</h1>
      <PasswordsForm resetPasswordToken={props.resetPasswordToken} handleChange={props.handleChange} />
    </div>
  )
}

export default Passwords
