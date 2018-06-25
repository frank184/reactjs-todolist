var pluralize = require('pluralize')
var DBAdapter = require('../db/connection')
var SyncDBAdapter = require('../db/sync_connection')

var ActiveModel = require('./ActiveModel')

class ActiveRecord extends ActiveModel {
  constructor(options = {}) {
    super(options)
    this.loadColumns(options)
  }

  loadColumns(options) {
    this.constructor.columns.forEach((column) => {
      if (column.type == 'boolean') this[column.name] = (options[column.name] === 1 ? true : false)
      else if (!this[column.name]) this[column.name] = options[column.name]
    })
  }

  static init(log) {
    return this.initialize(log)
  }

  static initialize(log = false) {
    this.log = log
    this.columns = []
    var sql = `PRAGMA table_info(${this.table})`
    if(this.log) console.log(' -- [SQL] ' + sql)
    var db = new SyncDBAdapter()
    this.columns = db.prepare(sql).all()
    return this
  }

  static get table() {
    return pluralize(this.name).toLowerCase()
  }

  get table() {
    return pluralize(this.constructor.name).toLowerCase()
  }

  static new(options) {
    return new this(options)
  }

  static all(next) {
    return this.where({}, next)
  }

  static find(id, next) {
    var task
    var sql = `SELECT * FROM ${this.table} WHERE id = ?`
    var params = [id]
    if(this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (row) task = new this(row)
      if (next) next.call(this, task)
    }).close()
    return task
  }

  static findBy(conditions, next) {
    var task
    var where = []
    var params = []
    for (var key in conditions) {
      where.push(key + ' = ?')
      params.push(conditions[key])
    }
    var sql = `SELECT * FROM ${this.table} WHERE ${where} `
    if(this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (row) task = new this(row)
      if (next) next.call(this, task)
    }).close()
    return task
  }

  static findSync(id, next) {
    var task
    var sql = `SELECT * FROM ${this.table} WHERE id = ?`
    var params = [id]
    if(this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new SyncDBAdapter()
    var row = db.prepare(sql).get(params)
    if (row) task = new this(row)
    if (next) next.call(this, task)
    return task
  }

  static findBySync(conditions, next) {
    var task
    var where = []
    var params = []
    for (var key in conditions) {
      where.push(key + ' = ?')
      params.push(conditions[key])
    }
    var sql = `SELECT * FROM ${this.table} WHERE ${where} `
    if(this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new SyncDBAdapter()
    var row = db.prepare(sql).get(params)
    if (row) task = new this(row)
    if (next) next.call(this, task)
    return task
  }

  static where(conditions = {}, next) {
    var tasks = []
    var where = []
    var params = []
    for (var key in conditions) {
      where.push(key + ' = ?')
      params.push(conditions[key])
    }
    var sql = `SELECT * FROM ${this.table} ${where.length !== 0 ? 'WHERE' : ''} ${where}`
    if(this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.all(sql, params, (err, rows) => {
      rows.forEach((row) => { tasks.push(new this(row)) })
      if (next) next.call(this, tasks)
    }).close()
    return tasks
  }

  static create(options, next) {
    var task = new this(options)
    if ( !task.valid() ) {
      if (next) next.call(this, task)
      return false
    }

    task.created_at = new Date().toUTCString()

    var sanitized_columns = this.columns.slice(1)
    var params = sanitized_columns.map((column) => {
      return (column.type === 'boolean' ? (task[column.name] === true ? 1 : 0) : task[column.name])
    })
    var sanitized_column_names = sanitized_columns.map((column) => { return column.name })
    var values = Array.from(sanitized_column_names).fill('?')
    var sql = `INSERT INTO ${this.table} (${sanitized_column_names}) VALUES (${values});`
    if(this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.serialize(() => {
      db.get(sql, params, (err, row) => {
        if (err) throw err
      }).get('SELECT last_insert_rowid() AS id', [], (err, row) => {
        if (err) throw err
        task.id = row.id // ?
        if (next) next.call(this, task, true)
      })
    }).close()
    return task
  }

  create(next) {
    if ( !this.valid() ) {
      if (next) next.call(this)
      return false
    }

    this.created_at = new Date().toUTCString()

    var sanitized_columns = this.constructor.columns.slice(1)
    var params = sanitized_columns.map((column) => {
      return (column.type === 'boolean' ? (this[column.name] === true ? 1 : 0) : this[column.name])
    })
    var sanitized_column_names = sanitized_columns.map((column) => { return column.name })
    var values = Array.from(sanitized_column_names).fill('?')
    var sql = `INSERT INTO ${this.table} (${sanitized_column_names}) VALUES (${values});`
    if (this.constructor.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.serialize(() => {
      db.get(sql, params, (err, row) => {
        if (err) throw err
      }).get('SELECT last_insert_rowid() AS id', [], (err, row) => {
        if (err) throw err
        this.id = row.id
        if (next) next.call(this, true)
      })
    }).close()
    return true
  }

  update(options = {}, next) {
    if ( !this.valid() ) {
      if (next) next.call(this)
      return false
    }

    this.updated_at = new Date().toUTCString()

    this.constructor.columns.forEach(column => {
      if(column.name !== 'id' && options[column.name] !== undefined)
        this[column.name] = options[column.name]
    })
    var sanitized_columns = this.constructor.columns.slice(1)
    var params = sanitized_columns.map((column) => {
      return column.type === 'boolean' ? (this[column.name] ? 1 : 0) : this[column.name]
    })
    var sanitized_columns = sanitized_columns.map((column) => { return column.name + ' = ?' })
    var sql = `UPDATE ${this.table} SET ${sanitized_columns} WHERE id = ${this.id};`
    if (this.constructor.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (next) next.call(this, true)
    }).close()
    return true
  }

  createOrUpdate(next) {
    this.exists((exists) => {
      if (exists) this.update(next)
      else this.create(next)
    })
  }

  save(next) {
    if ( !this.valid() ) {
      if (next) next.call(this, false)
      return false
    } else {
      this.createOrUpdate(next)
      return true
    }
  }

  static delete(id, next) {
    var sql = `DELETE FROM ${this.table} WHERE id = ?`
    var params = [id]
    if(this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (next) next.call(this)
    }).close()
  }

  static deleteAll(next) {
    var sql = `DELETE FROM ${this.table}`
    if(this.log) console.log(' -- [SQL] ' + sql)
    var db = new DBAdapter()
    db.get(sql, [], (err, row) => {
      if (err) throw err
      if (next) next.call(this)
    }).close()
  }

  delete(next) {
    var sql = `DELETE FROM ${this.table} WHERE id = ?`
    var params = [this.id]
    if (this.constructor.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (next) next.call(this)
    }).close()
  }

  static exists(id, next) {
    if (!id) return next.call(this, false)
    var sql = `SELECT COUNT(1) AS count FROM ${this.table} WHERE id = ?`
    var params = [id]
    if(this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (next) next.call(this, row.count !== 0)
    }).close()
  }

  exists(next) {
    if (!this.id) return next.call(this, false)
    var sql = `SELECT COUNT(1) AS count FROM ${this.table} WHERE id = ?`
    var params = [this.id]
    if (this.constructor.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (next) next.call(this, row.count !== 0)
    }).close()
  }

  newRecord(next) {
    if (!this.id) return next.call(this, true)
    var sql = `SELECT COUNT(1) AS count FROM ${this.table} WHERE id = ?`
    var params = [this.id]
    if (this.constructor.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (next) next.call(this, row.count === 0)
    }).close()
  }
}

module.exports = ActiveRecord
