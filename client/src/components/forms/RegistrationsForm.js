import React from 'react'
import Base from './Base'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class RegistrationsForm extends Base {
  constructor(props) {
    super(props)
    this.submitText = props.submitText
    this.state = props.state || {
      email: null,
      firstName: null,
      lastName: null
    }
    this.fieldNames = {
      email: 'Email',
      firstName: 'First Name',
      lastName: 'Last Name'
    }
  }

  handleSubmit(e) {
    alert('Sign Up Submitted!')
  }

  render() {
    var fields = []
    for (var key in this.state) {
      fields.push(
        <div key={key} className="row">
          <div className="col-sm-2">
            <div className="text-sm-right">{this.fieldNames[key]}:</div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input id={key} type="text" className="form-control" onChange={e => this.handleChange(e)} value={this.state[key]}/>
            </div>
          </div>
        </div>
      )
    }

    return <form className="form">
      {fields}
      <hr />
      <p>Have an account already? <Link to="/sessions/new">Sign in!</Link></p>
      <p><Link to="/passwords/new">Forgot your password?</Link></p>
      <Button bsStyle="primary" onClick={e => this.handleSubmit(e)}>
        {this.submitText}
      </Button>
    </form>
  }
}

export default RegistrationsForm
