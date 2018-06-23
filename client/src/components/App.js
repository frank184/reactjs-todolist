import React from 'react'
import Navigation from './Navigation'
import Flash from './Flash'
import TodoList from './TodoList'
import Registrations from './Registrations'
import Sessions from './Sessions'
import Passwords from './Passwords'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import {Button} from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flash: {
        show: true,
        fade: true,
        fadeDelay: 5000,
        fadeSpeed: 2000,
        children: (
          <div>
            Welcome to Todo List! Get started now by creating a few tasks for the day!
            {/* &nbsp;<Button onClick={e => this.handleDismissFlash(e)}>Close</Button> */}
          </div>
        ),
      },
      items: []
    }
  }

  handleDismissFlash(event) {
    this.setState({
      flash: { show: false }
    })
  }

  showFlash(flash) {
    flash.show = flash.show || true
    this.setState({flash: flash})
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Flash show={this.state.flash.show}
                  fade={this.state.flash.fade}
                  fadeDelay={this.state.flash.fadeDelay}
                  fadeSpeed={this.state.flash.fadeSpeed}
                  bsStyle={this.state.flash.bsStyle}
                  handleDismiss={e => this.handleDismissFlash(e)}>
            {this.state.flash.children}
          </Flash>
          <Route exact path="/" component={TodoList} />
          <Route exact path="/registrations/new" component={Registrations.New} />
          <Route exact path="/registrations/edit" component={Registrations.Edit} />
          <Route exact path="/sessions/new" component={Sessions.New} />
          <Route exact path="/passwords/new" component={Passwords.New} />
          <Route exact path="/passwords/edit" component={Passwords.Edit} />
        </div>
      </Router>
    )
  }
}

export default App
