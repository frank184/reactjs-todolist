import React from 'react'
import Base from './Base'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import RegistrationsAPI from '../../api/RegistrationsAPI'

class RegistrationsForm extends Base {
  constructor(props) {
    super(props)
    this.mode = props.mode
    this.submitText = props.submitText
    this.fieldNames = {
      email: 'Email',
      first_name: 'First Name',
      last_name: 'Last Name'
    }
    this.state = {
      user: {
        id: props.user.id,
        email: props.user.email,
        first_name: props.user.first_name,
        last_name: props.user.last_name
      }
    }
  }

  handleSubmit(e) {
    if (this.state.mode === 'new') {
      RegistrationsAPI.create(this.state.user)
      .then(userJSON => this.setState({user: userJSON}))
    } else {
      RegistrationsAPI.update(this.state.user)
      .then(userJSON => this.setState({user: userJSON}))
    }
  }

  render() {
    var fields = []
    for (var key in this.state.user) {
      if (key === 'id') continue
      fields.push(
        <div key={key} className="row">
          <div className="col-sm-2">
            <div className="text-sm-right">{this.fieldNames[key]}:</div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input autocomplete="off" id={key} type="text" className="form-control"
                value={this.state.user[key]} onChange={e => this.handleChange(e)} />
            </div>
          </div>
        </div>
      )
    }

    if (this.mode !== 'new')
      fields.push(<input type="hidden" id="id" value={this.state.user.id} />)

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

RegistrationsForm.defaultProps = {
  mode: 'new',
  state: {
    user: {
      id: -1,
      email: '',
      first_name: '',
      last_name: ''
    }
  }
}

export default RegistrationsForm
