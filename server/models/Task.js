var ActiveRecord = require('./ActiveRecord')

class Task extends ActiveRecord {
  constructor(options) {
    super(options)
    this.defaultValueOf('completed', false)
  }

  valid() {
    this.validatesPresenceOf('title')
    return this.errorsEmpty()
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      errors: this.errors
    }
  }
}

module.exports = Task
