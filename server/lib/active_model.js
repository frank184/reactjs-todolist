class ActiveModel {
  constructor(options) {
    this.errors = {}
    for (var key in options)
      this[key] = options[key]
  }

  defaultValueOf(column, defaultValue) {
    if (!new Boolean(this[column]).valueOf())
      this[column] = defaultValue
  }

  validatesPresenceOf(column) {
    if (!new Boolean(this[column]).valueOf())
      this.addError(column, 'cannot be blank')
    else this.removeError(column, 'cannot be blank')
  }

  validatesPresenceOfEncrypted(column) {
    let private_column = '_' + column
    if (!new Boolean(this[private_column]).valueOf())
      this.addError(column, 'cannot be blank')
    else this.removeError(column, 'cannot be blank')
  }

  validatesFormatOf(column, pattern) {
    if (!pattern.test(this[column]))
      this.addError(column, 'invalid format')
    else this.removeError(column, 'invalid format')
  }

  validatesLengthOf(column, min, max) {
    let msg = `must be at least ${min} characters long`
    let condition = this[column] && this[column].length >= min
    if (max) {
      msg = `${msg} and at most ${max}`
      condition = condition && this[column].length <= max
    }
    if (condition) this.removeError(column, msg)
    else this.addError(column, msg)
  }

  validatesUniquenessOf(column) {
    let db = new SyncDBAdapter()
    let record = db.prepare(`SELECT 1 FROM users WHERE ${this.id ? 'id != ' + this.id + ' AND ': ''} ${column} = ?`).get(this[column])
    if (record) this.addError(column, 'already exists')
    else this.removeError(column, 'already exists')
  }

  addError(column, msg) {
    if (this.errors[column]) {
      if (this.errors[column].indexOf(msg) === -1)
        this.errors[column].push(msg)
    } else {
      this.errors[column] = [msg]
    }
  }

  removeError(column, msg) {
    if (this.errors[column]) {
      var index = this.errors[column].indexOf(msg)
      if (index !== -1)
        this.errors[column].splice(index, 1)
      if (this.errors[column].length === 0)
        delete this.errors[column]
    }
  }

  errorsEmpty() {
    return Object.keys(this.errors).length === 0
  }

  static toJSON(collection) {
    return collection.map(element => element.toJSON())
  }
}

module.exports = ActiveModel
