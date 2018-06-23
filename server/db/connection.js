var path = require('path')
var sqlite3 = require('sqlite3').verbose()

// function DBAdapter(query, params, next, last) {
function DBAdapter() {
  var db_path = path.join(__dirname, 'todo_list.db')
  var db = new sqlite3.Database(db_path)
  // db.all(query, params, (err, rows) => {
  //   if (err) throw err
  //   rows.forEach((row) => {
  //     if (next) next.call(this, row)
  //   })
  //   if (last) last.call(this, rows)
  // })
  // db.close()
  return db
}

module.exports = DBAdapter
