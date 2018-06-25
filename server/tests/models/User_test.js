const assert = require('assert')
const User = require('../../models/User').init()
const SecureToken = require('secure-token')

function it_hasDBColumn(colum) {
  it (`should have a column ${colum.name} of type ${colum.type}`, () => {
    var dbColumn = User.columns.find(c => c.name === colum.name)
    assert.equal(dbColumn.name, colum.name)
    assert.equal(dbColumn.type, colum.type)
  })
}

function it_validatesPresenceOf(column) {
  it(`should validate presence of ${column}`, () => {
    var user = User.new()
    assert.equal(user.valid(), false)
    assert.equal(user.errors[column].includes('cannot be blank'), true)
  })
}

function it_isValid(options) {
  it(`${JSON.stringify(options)} should be valid`, () => {
    var user = User.new(options)
    assert.equal(user.valid(), true)
  })
}

function it_isInvalid(options) {
  it(`${JSON.stringify(options)} should be invalid`, () => {
    var user = User.new(options)
    assert.equal(user.valid(), false)
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
    describe('email undefined', () => {
      it('should not validate format of `email`', () => {
        var user = User.new()
        assert.equal(user.valid(), false)
        assert.equal(user.errors.email.includes('invalid format'), false)
      })
      it('should not validate uniqueness of email', () => {
        var user = User.new()
        assert.equal(user.valid(), false)
        assert.equal(user.errors.email.includes('already exists'), false)
      })
    })
    describe('email present', () => {
      it('should validate format of email', () => {
        var user = User.new({email: 'bademail'})
        assert.equal(user.valid(), false)
        assert.equal(user.errors.email.includes('invalid format'), true)
      })
      it('should validate uniqueness of email', () => {
        var user = User.new({email: 'user@mail.com'})
        assert.equal(user.valid(), false)
        assert.equal(user.errors.email.includes('already exists'), true)
      })
    })
    it_validatesPresenceOf('first_name')
    it_validatesPresenceOf('last_name')
    it_validatesPresenceOf('password')
    it('should validate password is at least 8 characters long', () => {
      var user = User.new({password: 'pass'})
      assert.equal(user.valid(), false)
      assert.equal(user.errors.password.includes('must be at least 8 characters long'), true)
    })
    describe('valid cases', () => {
      [
        {email: 'random@mail.com', first_name: 'a', last_name: 'b', password: 'password'},
      ].forEach(test => it_isValid(test))

      it('user id: 1 should always be valid', () => {
        User.find(1, user => assert.equal(user.valid(), true))
      })
    })
    describe('invalid cases', () => {
      [
        {},
        {email: '', first_name: '', last_name: '', password: ''},
        {email: '', first_name: 'a', last_name: '', password: ''},
        {email: '', first_name: 'a', last_name: 'b', password: ''},
        {email: '', first_name: 'a', last_name: 'b', password: 'c'},
        {email: '', first_name: 'a', last_name: 'b', password: 'password'},
        {email: 'badmail', first_name: 'a', last_name: 'b', password: 'password'},
        {email: 'user@mail.com', first_name: 'a', last_name: 'b', password: 'password'},
      ].forEach(test => it_isInvalid(test))
    })
  })

  describe('methods', () => {
    describe('generateSessionToken', () => {
      it('should set the session_token', () => {
        let user = User.new()
        assert.equal(user.session_token === undefined, true)
        user.generateSessionToken()
        assert.equal(user.session_token !== undefined, true)
        assert.equal(typeof user.session_token === 'string', true)
      })
      it('should return an instance of SecureToken', () => {
        let user = User.new()
        let sessionToken = user.generateSessionToken()
        assert.equal(sessionToken !== undefined, true)
        assert.equal(sessionToken instanceof SecureToken.constructor, true)
      })
    })
  })
})
