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
    var task = new Task(this.req.body)
    task.save(() => this.res.json(task))
  }

  /* PUT tasks/1.json */
  update() {
    var id = this.req.params.id
    Task.find(id, (task) => {
      if (task)
        task.update(this.req.body, () => this.res.json(task))
      else
        res.status(404).send()
    })
  }

  /* DELETE tasks/1.json */
  delete() {
    var id = this.req.params.id
    Task.find(id, (task) => {
      if (task)
        task.delete(() => this.res.json(task))
      else
        this.res.status(404).send()
    })
  }
}

module.exports = TasksController
