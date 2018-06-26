import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

var Navigation = (props) => (
  <Navbar collapseOnSelect className="navbar-static-top">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">TodoList</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      { props.user ? AuthedNavItems(props.user) : UnauthedNavItems() }
    </Navbar.Collapse>
  </Navbar>
)


var UnauthedNavItems = () => (
  <Nav pullRight>
    <li><Link to="/sessions/new">Sign In</Link></li>
    <li><Link to="/registrations/new">Sign Up</Link></li>
  </Nav>
)

var AuthedNavItems = (user) => (
  <Nav pullRight>
    <li><a>Welcome {user.firstName + '!'}</a></li>
    <li><Link to="/registrations/edit">Settings</Link></li>
  </Nav>
)

export default Navigation
