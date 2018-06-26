import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import fakeAuth from './fakeAuth'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => this.renderAuthedComponent} />
)

PrivateRoute.prototype.renderAuthedComponent = (props) => {
  if (fakeAuth.isAuthenticated)
    return <Component {...props} />
  else
    return <Redirect to={{
      pathname: '/sessions/new',
      state: { from: props.location }
    }} />
}

export default PrivateRoute
