require('./config/routes').stack
.map(layer => layer.route)
.map(route => {
  console.log(
    "%s %s",
    Object.keys(route.methods),
    route.path
  )
})
