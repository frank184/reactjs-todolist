var assert = require('assert')
var Task = require('../../models/Task').initialize()

describe('Task', () => {
  describe('db', () => {
    it ('should have a column `id` of type `integer`', () => {
      var column = Task.columns.find(column => column.name === 'id')
      assert.equal(column.name, 'id')
      assert.equal(column.type, 'integer')
    })
    it ('should have a column `title` of type `varchar(255)`', () => {
      var column = Task.columns.find(column => column.name === 'title')
      assert.equal(column.name, 'title')
      assert.equal(column.type, 'varchar(255)')
    })
    it ('should have a column `completed` of type `boolean`', () => {
      var column = Task.columns.find(column => column.name === 'completed')
      assert.equal(column.name, 'completed')
      assert.equal(column.type, 'boolean')
    })
  })

  describe('validation', () => {
    it('validate presence of `title`', () => {
      var task = Task.new()
      task.valid()
      assert.equal(task.errors.title.includes('cannot be blank'), true)
    })
  })

  describe('default', () => {
    it('should assign `completed` to `false` by default', () => {
      var task = Task.new()
      assert.equal(task.completed, false)
    })
  })
})
