class ActionDispatcher {
  constructor(req, res, action) {
    this.req = req
    this.res = res
    this.action = action
    this.beforeAction()
    this[action]()
    this.afterAction()
  }
  beforeAction() {}
  afterAction() {}
}

module.exports = ActionDispatcher
