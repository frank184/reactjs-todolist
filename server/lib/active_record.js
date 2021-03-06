var pluralize = require('pluralize')
var DBAdapter = require('../db/connection')
var SyncDBAdapter = require('../db/sync_connection')

var ActiveModel = require('./active_model')

/***
*   ActiveRecordJS - TODO: all db calls need to be refactored to call a real DB Adapter
*     static:
*       - table
*       - columns
*       - init(log = false)
*       - new()
*       - create()
*       - all/Sync()
*       - where/Sync()
*       - find/Sync()
*       - findBy/Sync()
*       - exists()
*       - update()
*       - updateAll()
*       - delete()
*       - deleteAll()
*     instance:
*       - save()
*       - createOrUpdate()
*       - create()
*       - update()
*       - delete()
*       - exists()
*       - newRecord()
*       - validatesUniquenessOf()
*
***/
class ActiveRecord extends ActiveModel {
  constructor(options = {}) {
    super(options)
    this.constructor.columns.forEach((column) => {
      if (column.type == 'boolean') this[column.name] = (options[column.name] === 1 ? true : false)
      else if (!this[column.name]) this[column.name] = options[column.name]
    })
  }

  //
  //
  //  Static methods
  //
  //

  static init(log = false) {
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

  static new(options) {
    return new this(options)
  }

  static all(next) {
    return this.where({}, next)
  }

  static allSync() {
    return this.whereSync({})
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

  static whereSync(conditions = {}) {
    var where = []
    var params = []
    for (var key in conditions) {
      where.push(key + ' = ?')
      params.push(conditions[key])
    }
    var sql = `SELECT * FROM ${this.table} ${where.length !== 0 ? 'WHERE' : ''} ${where}`
    if(this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new SyncDBAdapter()
    var rows = db.prepare(sql).all(params)
    return rows.map(row => new this(row))
  }

  static create(options, next) {
    var task = new this(options)
    if ( !task.valid() ) {
      if (next) next.call(this, task, false)
      return false
    }

    task.created_at = new Date().toUTCString()

    var sanitized_columns = this.columns.slice(1)
    var params = sanitized_columns.map((column) => {
      if (column.type === 'boolean')
        return task[column.name] ? 1 : 0
      else if (task[column.name] && column.name.endsWith('_at'))
        return new Date(task[column.name]).toUTCString()
      else return task[column.name]
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

  static update(ids, options = {}, next) {
    var sanitized_columns = this.columns.slice(1)
    var sanitized_column_assignements = []

    var params = []
    sanitized_columns.forEach((column) => {
      if (column.name === 'updated_at') {
        sanitized_column_assignements.push('updated_at = ?')
        params.push(new Date().toUTCString())
      } else if (options.hasOwnProperty(column.name)) {
        if (column.type === 'boolean') {
          sanitized_column_assignements.push(`${column.name} = ?`)
          params.push(options[column.name] ? 1 : 0)
        } else if (column.name !== 'created_at' && column.name !== 'updated_at' && column.name.endsWith('_at')) {
          if (options[column.name]) {
            sanitized_column_assignements.push(`${column.name} = ?`)
            params.push(new Date(options[column.name]).toUTCString())
          } else {
            sanitized_column_assignements.push(`${column.name} = ?`)
            params.push(null)
          }
        }
      }
    })

    var sql = `UPDATE ${this.table} SET ${sanitized_column_assignements} WHERE id IN (${ids});`
    if (this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (next) next.call(this, true)
    }).close()
    return true
  }

  static updateAll(options = {}, next) {
    var sanitized_columns = this.columns.slice(1)
    var sanitized_column_assignements = []

    var params = []
    sanitized_columns.forEach((column) => {
      if (column.name === 'updated_at') {
        sanitized_column_assignements.push('updated_at = ?')
        params.push(new Date().toUTCString())
      } else if (options.hasOwnProperty(column.name)) {
        if (column.type === 'boolean') {
          sanitized_column_assignements.push(`${column.name} = ?`)
          params.push(options[column.name] ? 1 : 0)
        } else if (column.name !== 'created_at' && column.name !== 'updated_at' && column.name.endsWith('_at')) {
          if (options[column.name]) {
            sanitized_column_assignements.push(`${column.name} = ?`)
            params.push(new Date(options[column.name]).toUTCString())
          } else {
            sanitized_column_assignements.push(`${column.name} = ?`)
            params.push(null)
          }
        }
      }
    })

    var sql = `UPDATE ${this.table} SET ${sanitized_column_assignements} WHERE id IN (SELECT id FROM ${this.table});`
    if (this.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (next) next.call(this, true)
    }).close()
    return true
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

  //
  //
  //  Instance methods
  //
  //

  create(next) {
    if ( !this.valid() ) {
      if (next) next.call(this, false)
      return false
    }

    this.created_at = new Date().toUTCString()

    var sanitized_columns = this.constructor.columns.slice(1)
    var params = sanitized_columns.map((column) => {
      if (column.type === 'boolean')
        return this[column.name] ? 1 : 0
      else if (this[column.name] && column.name.endsWith('_at'))
        return new Date(this[column.name]).toUTCString()
      else return this[column.name]
    })
    var sanitized_column_names = sanitized_columns.map((column) => { return column.name })
    var values = Array.from(sanitized_column_names).fill('?')
    var sql = `INSERT INTO ${this.constructor.table} (${sanitized_column_names}) VALUES (${values});`
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
      if (next) next.call(this, false)
      return false
    }

    this.updated_at = new Date().toUTCString()

    this.constructor.columns.forEach(column => {
      if(column.name !== 'id' && options[column.name] !== undefined)
        this[column.name] = options[column.name]
    })
    var sanitized_columns = this.constructor.columns.slice(1)
    var params = sanitized_columns.map((column) => {
      if (column.type === 'boolean')
        return this[column.name] ? 1 : 0
      else if (this[column.name] && column.name.endsWith('_at'))
        return new Date(this[column.name]).toUTCString()
      else return this[column.name]
    })
    var sanitized_column_names = sanitized_columns.map((column) => { return column.name + ' = ?' })
    var sql = `UPDATE ${this.constructor.table} SET ${sanitized_column_names} WHERE id = ${this.id};`
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

  delete(next) {
    var sql = `DELETE FROM ${this.constructor.table} WHERE id = ?`
    var params = [this.id]
    if (this.constructor.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (next) next.call(this)
    }).close()
  }

  exists(next) {
    if (!this.id) return next.call(this, false)
    var sql = `SELECT COUNT(1) AS count FROM ${this.constructor.table} WHERE id = ?`
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
    var sql = `SELECT COUNT(1) AS count FROM ${this.constructor.table} WHERE id = ?`
    var params = [this.id]
    if (this.constructor.log) console.log(' -- [SQL] ' + sql, params)
    var db = new DBAdapter()
    db.get(sql, params, (err, row) => {
      if (err) throw err
      if (next) next.call(this, row.count === 0)
    }).close()
  }

  validatesUniquenessOf(column) {
    let db = new SyncDBAdapter()
    let record = db.prepare(`SELECT 1 FROM users WHERE ${this.id ? 'id != ' + this.id + ' AND ': ''} ${column} = ?`).get(this[column])
    if (record) this.addError(column, 'already exists')
    else this.removeError(column, 'already exists')
  }
  // end of class
}

module.exports = ActiveRecord
