const sendgrid = require('sendgrid')
const callerId = require('caller-id')
const pug = require('pug')
const path = require('path')
const fs = require('fs')

const Email = sendgrid.mail.Email
const Content = sendgrid.mail.Content
const Mail = sendgrid.mail.Mail

class Mailer {
  constructor(options) {
    this.sg = sendgrid(process.env.SENDGRID_API_KEY)
    for (var key in this.constructor.defaults)
      this[key] = this.constructor.defaults[key]
    for (var key in options)
      this[key] = options[key]
  }

  mail(options = {}, locals, next) {
    let caller    = callerId.getData(),
        klass     = caller.typeName.replace(/([A-Z][a-z]*)(?:.*)([A-Z][a-z]*)/, '$1_$2').toLowerCase(),
        method    = caller.functionName.toLowerCase(),
        view_path = path.join(Mailer.views_path, klass, method)
    this.content = pug.renderFile(view_path, locals);
    this.mail = new Mail(
      new Email(options.from || this.from),
      options.subject || this.subject,
      new Email(options.to || this.to),
      new Content(options.type || this.type, options.content || this.content)
    )
    this.request = this.sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.mail.toJSON()
    })
  }

  deliver() {
    this.sg.API(this.request)
    .then(response => this.response = response)
    .catch(error => this.error = error)
    .then(next)
  }
}

Mailer.views_path = path.join(__dirname, '..', 'app','views', 'mailers')

Mailer.defaults = {
  type: 'text/plain',
  from: 'test@example.com',
  to: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  content: 'and easy to do anywhere, even with Node.js'
}

module.exports = Mailer
