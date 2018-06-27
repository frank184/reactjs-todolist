var ApplicationController = require('./application_controller')

class TasksController extends ApplicationController {
  /* GET tasks.json */
  index() {
    Task.all((tasks) => this.res.json(tasks))
  }

  show() {
    var id = this.req.params.id
    Task.find(id, (task) => {
      if (task) this.res.json(task)
      else this.res.status(404).send()
    })
  }

  /* POST tasks.json */
  create() {
    var task = new Task(this.task_params)
    task.save(() => this.res.json(task))
  }

  /* PUT tasks/1.json */
  update() {
    var id = this.req.params.id
    Task.find(id, (task) => {
      if (task) task.update(this.task_params, () => this.res.json(task))
      else res.status(404).send()
    })
  }

  /* DELETE tasks/1.json */
  delete() {
    var id = this.req.params.id
    Task.find(id, (task) => {
      if (task) task.delete(() => this.res.json(task))
      else this.res.status(404).send()
    })
  }

  get task_params() {
    return {
      title: this.req.body.title,
      completed: this.req.body.completed,
      due_at: this.req.body.due_at
    }
  }
}

module.exports = TasksController
