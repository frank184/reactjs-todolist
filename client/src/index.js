import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/Datetime.css'
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

var fadeOutEvent = new Event('fade-out')
var fadeOutElems = document.getElementsByClassName('fade-out')
var fadeOutFn = (e) => {
  var delay = elem.getAttribute('fadedelay')
  var speed = elem.getAttribute('fadespeed')
  var opacity = 1
  setTimeout(() => {
    var speedTimer = setInterval(() => {
      if (opacity <= 0.1) {
        clearInterval(speedTimer)
        elem.style.display = 'none'
      }
      elem.style.opacity = opacity
      elem.style.filter = `alpha(opacity = ${opacity * 100})`
      opacity -= opacity * 0.1
    }, speed / 50)
  }, delay)
}
for (var i = 0; i < fadeOutElems.length; i++) {
  var elem = fadeOutElems[i]
  elem.addEventListener('fade-out', fadeOutFn, false)
  elem.dispatchEvent(fadeOutEvent)
}
