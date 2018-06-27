const Mailer = require('../../lib/mailer')

class ApplicationMailer extends Mailer {}

ApplicationMailer.defaults = {
  type: 'text/html',
  from: 'admin@todolist.com',
}

module.exports = ApplicationMailer
