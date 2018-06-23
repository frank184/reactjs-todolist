import Base from './Base'

class TasksAPI extends Base {
  static index() {
    return this.api('/tasks.json', 'GET')
  }

  static create(task) {
    return this.api('/tasks.json', 'POST', task)
  }

  static update(task) {
    return this.api('/tasks/' + task.id, 'PUT', task)
  }

  static delete(task) {
    return this.api('/tasks/' + task.id, 'DELETE')
  }
}

export default TasksAPI
