import React from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Form from './Form'
import Flash from '../Flash'

import SessionsAPI from '../../api/SessionsAPI'

class SessionsForm extends Form {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: '',
      },
      flash: {}
    }
  }

  handleSubmit(e) {
    SessionsAPI.create(this.state.user)
    .then(userJSON => {
      if (Object.keys(userJSON.errors).length === 0) {
        this.setState({
          flash: {
            show: true,
            bsStyle: 'info',
            children: (<p>Welcome {userJSON.first_name} {userJSON.last_name}!</p>)
          }
        })
      } else {
        this.setState({
          user: {
            email: '',
            password: '',
          },
          flash: {
            show: true,
            bsStyle: 'danger',
            children: userJSON.errors.email_or_password
          }
        })
      }
    })
  }

  handleChange(e) {
    var user = this.state.user
    user[e.target.id] = e.target.value
    this.setState({user: user, flash: this.state.flash})
  }

  handleDismiss(e) {
    this.setState({ flash: {}, user: this.state.user })
  }

  render() {
    return <form className="form">
      <Flash show={this.state.flash.show} bsStyle={this.state.flash.bsStyle}
        handleDismiss={e => this.handleDismiss(e)}
        children={this.state.flash.children} />
      <div className="row">
        <div className="col-sm-2">
          <div className="text-sm-right">Email:</div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <input id="email" autoComplete="off" type="text" className="form-control"
              value={this.state.user.email} onChange={e => this.handleChange(e)} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-2">
          <div className="text-sm-right">Password:</div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <input id="password" autoComplete="off" type="password" className="form-control"
              value={this.state.user.password} onChange={e => this.handleChange(e)} />
          </div>
        </div>
      </div>

      <hr />
      <p>Don't have an account yet? <Link to="/registrations/new">Register now!</Link></p>
      <p><Link to="/passwords/new">Forgot your password?</Link></p>
      <Button bsStyle="primary" onClick={e => this.handleSubmit(e)}>Sign In</Button>
    </form>
  }
}

export default SessionsForm
