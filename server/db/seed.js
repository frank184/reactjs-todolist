User = require('../app/models/User').init(true)
Task = require('../app/models/Task').init(true)


User.create({email: 'user@mail.com', first_name: 'John', last_name: 'Cena', password: 'password'})

var tasks = [
  {title: "Wake Up", completed: true},
  {title: "Take a Shower", completed: false},
  {title: "Brush Teeth", completed: false},
  {title: "Eat Breakfast", completed: false},
  {title: "Go To Work", completed: false}
].forEach(task => { Task.create(task) })
