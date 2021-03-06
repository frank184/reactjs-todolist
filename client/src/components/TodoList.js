import React from 'react';
import Item from './Item'
import TasksAPI from '../api/TasksAPI'
import Datetime from 'react-datetime'

import './TodoList.css';

class TodoList extends React.Component {

  // Overrides

  constructor(props) {
    super(props)
    this.state = { items: [] }
  }

  componentDidMount() {
    TasksAPI.index().then(items => this.setState({ items: items }))
  }

  render() {
    return (
      <div className="container">
        <div className="todo-list">

          <h1 className="row page-header">
            <div className="col-sm-6">
              Todo List
            </div>
            <div className="col-sm-3">
              <div className="form-group form-controls">
                <Datetime inputProps={{id: 'due_at', placeholder: 'Due'}}/>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-group">
                <input id="title" type="text" placeholder="Title" autoComplete="off"
                        className="form-control input-md"
                        onKeyPress={(e) => this.handleNewTask(e)}></input>
              </div>
            </div>
          </h1>

          <ul className="list-group">
            {this.renderItems(this.state.items)}
          </ul>
        </div>
      </div>
    )
  }

  // Methods

  renderItem(item) {
    return <Item  key={item.id}
                  id={item.id}
                  title={item.title}
                  due_at={item.due_at}
                  completed={item.completed}
                  onCheckboxClick={() => this.toggleCompleted(item)}
                  handleDeleteTask={() => this.handleDeleteTask(item)}
                  handleUpdateTask={(e) => this.handleUpdateTask(e, item)} />
  }

  renderItems(items) {
    var that = this;
    return this.state.items.map(function(item) {
      return that.renderItem(item)
    })
  }

  handleNewTask(e) {
    if (e.which !== 13) return
    var inputTitle = document.querySelector('#title')
    var inputDueAt = document.querySelector('#due_at')
    TasksAPI.create({
      title: inputTitle.value,
      due_at: inputDueAt.value
    }).then(itemJSON => {
      if (Object.keys(itemJSON.errors).length !== 0) {
        for (var error in itemJSON.errors)
          inputTitle.placeholder = error + ' ' + itemJSON.errors[error]
        inputTitle.classList.add('error')
        inputTitle.classList.remove('success')
      } else {
        var newItems = this.state.items
        newItems.push(itemJSON)
        this.setState({ items: newItems })
        inputTitle.classList.add('success')
        inputTitle.classList.remove('error')
        inputTitle.placeholder = ''
      }
    })
    e.target.value = ''
  }

  handleDeleteTask(item) {
    TasksAPI.delete(item.id).then(itemJSON => {
      var index = -1
      for (var key in this.state.items) {
        index++
        if (this.state.items[key].id === itemJSON.id) { break }
      }
      var newItems = this.state.items
      newItems.splice(index, 1)
      this.setState({ items: newItems })
    })
  }

  toggleCompleted(item) {
    item.completed = !item.completed
    TasksAPI.update(item).then(item => {
      var index = this.state.items.indexOf(item)
      var newItems = this.state.items
      newItems[index] = item
      this.setState({ items: newItems })
    })
  }

  handleUpdateTask(e, item) {
    if (e.which !== 13) return
    var elem = e.target
    item.title = elem.value
    TasksAPI.update(item).then(item => {
      var index = this.state.items.indexOf(item)
      var newItems = this.state.items
      newItems[index] = item
      this.setState({ items: newItems })
      elem.classList.remove('visible')
      elem.classList.add('invisible')
      var otherElem = elem.previousSibling
      otherElem.classList.remove('invisible')
      otherElem.classList.add('visible')
      otherElem.focus()
    })
  }
}

export default TodoList
