require('./config/routes').stack
.map(layer => layer.route)
.map(route => {
  console.log(
    "%s %s(%s)",
    Object.keys(route.methods),
    route.path[0],
    route.path[1].replace(route.path[0], '')
  )
})
