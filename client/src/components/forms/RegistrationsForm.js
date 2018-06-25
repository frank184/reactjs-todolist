import React from 'react'
import Base from './Base'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Flash from '../Flash'

import RegistrationsAPI from '../../api/RegistrationsAPI'

class RegistrationsForm extends Base {
  constructor(props) {
    super(props)
    this.mode = props.mode
    this.submitText = props.submitText
    this.fieldNames = {
      email: 'Email',
      first_name: 'First Name',
      last_name: 'Last Name',
      password: 'Password'
    }
    this.state = {
      flash: {},
      user: {
        email: props.user.email,
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        password: props.user.password
      }
    }
  }

  handleChange(e) {
    var user = this.state.user
    user[e.target.id] = e.target.value
    this.setState({user: user, flash: this.state.flash})
    e.target.classList.remove('error')
  }

  handleSubmit(e) {
    if (this.mode === 'new') {
      RegistrationsAPI.create(this.state.user)
      .then(userJSON => {
        if (Object.keys(userJSON.errors).length === 0)
          this.handleSuccess(userJSON)
        else
          this.handleFailure(userJSON.errors)
      })
    } else {
      RegistrationsAPI.update(this.state.user)
      .then(userJSON => {
        if (Object.keys(userJSON.errors).length === 0)
          this.handleSuccess(userJSON)
        else
          this.handleFailure(userJSON.errors)
      })
    }
  }

  handleSuccess(user) {
    this.setState({ flash: {show: true, bsStyle: 'info', children: (<p>Welcome {user.first_name} {user.last_name}!</p>)} })
  }

  handleFailure(errors) {
    let errorsHTML = []
    for (var key in errors) {
      errorsHTML.push(<div>{this.fieldNames[key]} {errors[key]}</div>)
      document.getElementById(key).classList.add('error')
    }
    this.setState({
      user: this.state.user,
      flash: {
        show: true,
        bsStyle: 'danger',
        children: errorsHTML
      }
    })
  }

  handleDismiss(e) {
    this.setState({ flash: {}, user: this.state.user })
  }

  render() {
    var fields = []
    for (var key in this.state.user) {
      if (key === 'id') continue
      fields.push(
        <div key={key} className="row">
          <div className="col-sm-3">
            <div className="text-sm-right">{this.fieldNames[key]}:</div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input autocomplete="off" id={key} type={key === 'password' ? 'password' : 'text' } className="form-control"
                value={this.state.user[key]} onChange={e => this.handleChange(e)} />
            </div>
          </div>
        </div>
      )
    }
    return <form className="form">
      <Flash show={this.state.flash.show}
              bsStyle={this.state.flash.bsStyle}
              children={this.state.flash.children}
              handleDismiss={e => this.handleDismiss(e)}/>
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

RegistrationsForm.defaultProps = {
  mode: 'new',
  user: {
    email: '',
    first_name: '',
    last_name: '',
    password: ''
  }
}

export default RegistrationsForm
