class ActiveModel {
  constructor() {
    this.errors = {}
  }

  defaultValueOf(column, defaultValue) {
    if (!new Boolean(this[column]).valueOf())
      this[column] = defaultValue
  }

  validatesPresenceOf(column) {
    if (!new Boolean(this[column]).valueOf())
      this.errors[column] = ['cannot be blank']
    else delete this.errors[column]
  }

  errorsEmpty() {
    return Object.keys(this.errors).length === 0
  }
}

module.exports = ActiveModel
