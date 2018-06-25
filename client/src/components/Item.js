import React from 'react';
import moment from 'moment'
import Datetime from 'react-datetime'

var Item = (props) => (
  <li key={props.id} id={props.id} className="list-group-item">
    <div className="row">
      <div className="col-sm-1">
        <input type="checkbox" checked={props.completed} value={props.completed} onChange={props.onCheckboxClick}></input>
      </div>
      <div className="col-sm-5">
        <span className={props.completed === true ? 'completed visible' : 'incomplete visible'} onClick={props.toggleField}>
          {props.title}
        </span>
        <input type="text" className="form-control input-sm inline-inputs invisible" onKeyPress={(e) => props.handleTitleUpdate(e, props) } onBlur={props.toggleField}></input>
      </div>
      <div className="col-sm-5">
        <i className="text-right" onClick={props.toggleField}>{props.due_at && props.due_at !== '' ? `due ${moment(props.due_at).fromNow()}` : ''}</i>
        <Datetime className="invisible" value={props.due_at} />
      </div>
      <div className="col-sm-1">
        <div className="pull-right" onClick={props.handleDeleteTask}>&times;</div>
      </div>
    </div>
  </li>




)

export default Item
