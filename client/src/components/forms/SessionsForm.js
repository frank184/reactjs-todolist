import React from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Base from './Base'

class SessionsForm extends Base {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null
    }
  }

  handleSubmit(e) {
    alert('Sign In Submitted!')
  }

  render() {
    return <form className="form">
      <div className="row">
        <div className="col-sm-2">
          <div className="text-sm-right">Email:</div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <input type="text" className="form-control" onChange={e => this.handleChange(e)} value={this.state.email} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-2">
          <div class="text-sm-right">Password:</div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <input type="password" className="form-control" onChange={e => this.handleChange(e)} value={this.state.password} />
          </div>
        </div>
      </div>

      <hr />
      <p>Don't have an account yet? <Link to="/registrations/new">Register now!</Link></p>
      <p><Link to="/passwords/new">Forgot your password?</Link></p>
      <Button bsStyle="primary" onClick={this.handleSubmit}>Sign In</Button>
    </form>
  }
}

export default SessionsForm
