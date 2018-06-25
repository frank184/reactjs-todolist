var assert = require('assert')
var User = require('../../models/User').initialize()

function it_hasDBColumn(c) {
  it (`should have a column ${c.name} of type ${c.type}`, () => {
    var dbColumn = User.columns.find(column => column.name === c.name)
    assert.equal(dbColumn.name, c.name)
    assert.equal(dbColumn.type, c.type)
  })
}

function it_validatesPresenceOf(column) {
  it(`should validate presence of ${column}`, () => {
    var user = User.new()
    user.valid()
    assert.equal(user.errors[column].includes('cannot be blank'), true)
  })
}

describe('User', () => {
  describe('db', () => {
    it_hasDBColumn({name: 'id', type: 'integer'})
    it_hasDBColumn({name: 'email', type: 'varchar(255)'})
    it_hasDBColumn({name: 'first_name', type: 'varchar(255)'})
    it_hasDBColumn({name: 'last_name', type: 'varchar(255)'})
    it_hasDBColumn({name: 'encrypted_password', type: 'varchar(255)'})
    it_hasDBColumn({name: 'session_token', type: 'varchar(255)'})
  })

  describe('validation', () => {
    it_validatesPresenceOf('email')
    it_validatesPresenceOf('first_name')
    it_validatesPresenceOf('last_name')
    it_validatesPresenceOf('password')

    describe('email undefined', () => {
      it('should not validate format of `email`', () => {
        var user = User.new()
        user.valid()
        assert.equal(user.errors.email.includes('invalid format'), false)
      })
      it('should not validate uniqueness of `email`', () => {
        var user = User.new()
        user.valid()
        assert.equal(user.errors.email.includes('already exists'), false)
      })
    })
    describe('email present', () => {
      it('should validate format of `email`', () => {
        var user = User.new({email: 'bademail'})
        user.valid()
        assert.equal(user.errors.email.includes('invalid format'), true)
      })
      it('should validate uniqueness of `email`', () => {
        var user = User.new({email: 'user@mail.com'})
        user.valid()
        assert.equal(user.errors.email.includes('already exists'), true)
      })
    })
  })
})
