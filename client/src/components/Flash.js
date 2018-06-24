import React from 'react'
import {Alert} from 'react-bootstrap'
import PropTypes from 'prop-types'

const Flash = (props) => {
  var alert = null
  if (props.show) {
    alert = <Alert id="flash"
                    fadedelay={props.fadeDelay}
                    fadespeed={props.fadeSpeed}
                    className={(props.fade ? 'fade-out' : '')}
                    bsStyle={props.bsStyle}
                    onDismiss={props.handleDismiss}>
      <div className="container">
        {props.children}
      </div>
    </Alert>
  }
  return alert
}

Flash.defaultProps = {
  show: false,
  bsStyle: 'info',
  children: null,
  fade: false,
  fadeTimer: null,
  fadeSpeed: 1000,
}

Flash.propTypes = {
  show: PropTypes.boolean,
  bsStyle: PropTypes.string,
  children: PropTypes.object,
  fade: PropTypes.boolean,
  fadeTimer: PropTypes.number,
  fadeSpeed: PropTypes.number,
}

export default Flash
