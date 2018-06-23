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
}

module.exports = Task
