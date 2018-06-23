import React from 'react'
import Base from './Base'
import {Button} from 'react-bootstrap'

class PasswordResetsForm extends Base {
  render() {
    return <div>
      <div className="row">
        <div className="col-sm-2">
          <div className="text-sm-right">Email:</div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <input type="text" className="form-control" onChange={e => this.handleChange(e)} />
          </div>
        </div>
        <div className="col-sm-4">
          <Button onClick={e => this.handleSubmit(e)}>Send email confirmation</Button>
        </div>
      </div>
      <hr />
    </div>
  }
}

export default PasswordResetsForm
