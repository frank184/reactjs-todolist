import React from 'react'
import RegistrationsForm from './forms/RegistrationsForm'

var Registrations = {
  New: () => (
    <div className="container">
      <h1 className="page-header">Sign Up</h1>
      <RegistrationsForm mode='new' submitText="Create an Account" />
    </div>
  ),
  Edit: (props) => (
    <div className="container">
      <h1 className="page-header">Edit Account</h1>
      <RegistrationsForm mode='edit' submitText="Update Account"
        user={{id: 2, email: 'user@mail.com', first_name: 'John', last_name: 'Cena'}} />
    </div>
  ),
}

export default Registrations
