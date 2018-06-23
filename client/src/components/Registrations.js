import React from 'react'
import RegistrationsForm from './forms/RegistrationsForm'

var Registrations = {
  New: () => (
    <div className="container">
      <h1 className="page-header">Sign Up</h1>
      <RegistrationsForm submitText="Create an Account" />
    </div>
  ),
  Edit: (props) => (
    <div className="container">
      <h1 className="page-header">Edit Account</h1>
      <RegistrationsForm submitText="Update Account" state={{email: 'user@mail.com', firstName: 'John', lastName: 'Cena'}} />
    </div>
  ),
}

export default Registrations
