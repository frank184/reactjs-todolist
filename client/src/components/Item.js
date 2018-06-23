import React from 'react';

var Item = (props) => (
  <li key={props.id} id={props.id} className="list-group-item">
    <input type="checkbox" checked={props.completed} value={props.completed} onChange={props.onCheckboxClick}></input>
    <span className={props.completed === true ? 'completed visible' : 'incomplete visible'} onClick={props.toggleTitleField}> {props.title}</span>
    <input type="text" className="form-control input-sm inline-inputs invisible" onKeyPress={(e) => props.handleTitleUpdate(e, props) } onBlur={props.toggleTitleField}></input>
    <div className="pull-right" onClick={props.handleDeleteTask}>&times;</div>
  </li>
)

export default Item
