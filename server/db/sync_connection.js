var path = require('path')
var better_sqlite3 = require('better-sqlite3')

function SyncDBAdapter() {
  var db_path = path.join(__dirname, 'todo_list.db')
  var db = new better_sqlite3(db_path)
  return db
}

module.exports = SyncDBAdapter
