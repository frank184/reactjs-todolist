import React from 'react'

class Form extends React.Component {
  handleChange(e) {
    var newState = this.state
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }

  handleSubmit(e) {
    alert('Form Submitted! You might want to overwrite this!')
  }
}

export default Form
