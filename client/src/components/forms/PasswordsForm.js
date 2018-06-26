import React from 'react'
import Form from './Form'
import {Button} from 'react-bootstrap'

class PasswordsForm extends Form {
  render() {
    return <div>
      <div className="row">
        <div className="col-sm-3">
          <div className="text-sm-right">New Password:</div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <input type="text" className="form-control" onChange={e => this.handleChange(e)} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <div className="text-sm-right">Confirm Password:</div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <input type="text" className="form-control" onChange={e => this.handleChange(e)} />
          </div>
        </div>
      </div>
      <hr />
      <Button bsStyle="primary" onClick={e => this.handleSubmit(e)}>Update password</Button>
    </div>
  }
}

export default PasswordsForm
