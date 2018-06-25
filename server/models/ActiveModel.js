var SyncDBAdapter = require('../db/sync_connection')

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
    let encrypted_column = 'encrypted_' + column
    if (!new Boolean(this[encrypted_column]).valueOf())
      this.addError(column, 'cannot be blank')
    else this.removeError(column, 'cannot be blank')
  }

  validatesFormatOf(column, pattern) {
    if (!pattern.test(this[column]))
      this.addError(column, 'invalid format')
    else this.removeError(column, 'invalid format')
  }

  validatesUniquenessOf(column) {
    let db = new SyncDBAdapter(),
        record = db.prepare(`SELECT 1 FROM users WHERE ${column} = ?`).get(this[column])
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
