var path = require('path')
var sqlite3 = require('sqlite3').verbose()

function DBAdapter() {
  var db_path = path.join(__dirname, 'todo_list.db')
  var db = new sqlite3.Database(db_path)
  return db
}

module.exports = DBAdapter
