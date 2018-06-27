import React from 'react';
import moment from 'moment'
import Datetime from 'react-datetime'

import './Item.css'

const toggleField = (event) => {
  var elem = event.target
  elem.classList.remove('visible')
  elem.classList.add('invisible')
  var isInputText = elem instanceof HTMLInputElement && elem.type === 'text'
  var otherElem = isInputText ? elem.previousSibling : elem.nextSibling
  var otherIsInputText = otherElem instanceof HTMLInputElement && otherElem.type === 'text'
  if (!isInputText && !otherIsInputText) otherElem = otherElem.firstChild
  otherElem.classList.add('visible')
  otherElem.classList.remove('invisible')
  otherElem.value = elem.innerText.trim()
  otherElem.focus()
}

const hideDatetime = (event) => {
  var elem = document.getElementsByClassName('rdtOpen')[0].firstChild
  elem.classList.add('invisible')
  elem.classList.remove('visible')
  var otherElem = elem.parentNode.previousSibling
  otherElem.classList.add('visible')
  otherElem.classList.remove('invisible')
}

const handleDatetimeChange = (event) => {

}

const Item = (props) => (
  <li key={props.id} id={props.id} className="list-group-item">
    <div className="row">
      <div className="col-xs-1">
        <input type="checkbox" checked={props.completed} value={props.completed} onChange={props.onCheckboxClick}></input>
      </div>
      <div className="col-sm-6 col-xs-5">
        <span className={props.completed === true ? 'completed visible' : 'incomplete visible'}
          onClick={toggleField}>
          {props.title}
        </span>
        <input type="text" className="form-control input-xs inline-inputs invisible"
          onKeyPress={props.handleUpdateTask}
          onBlur={toggleField}></input>
      </div>
      <div className="col-sm-4 col-xs-5">
        <i onClick={toggleField}>
          {props.due_at && props.due_at !== '' ? `due ${moment(props.due_at).fromNow()}` : ''}
        </i>
        <Datetime inputProps={{className: 'invisible form-control input-sm input-ss'}}
          value={props.due_at}
          onBlur={e => hideDatetime(e)}
          onChange={e => handleDatetimeChange(e)}/>
      </div>
      <div className="col-xs-1">
        <div className="pull-right" onClick={props.handleDeleteTask}>&times;</div>
      </div>
    </div>
  </li>
)

export default Item
