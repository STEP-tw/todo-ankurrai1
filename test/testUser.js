const User = require('../classes/user.js');
const assert = require('chai').assert;
var user;

describe('User',function () {
  beforeEach(function () {
    user = new User('ankur',1);
  })

  it('should contain a unique Id',function () {
    assert.propertyVal(user,'id',1);
  })

  it('should contain name',function () {
    assert.propertyVal(user,'name','ankur');
  })

  it('should contain a todo list',function () {
    assert.deepPropertyVal(user,'todoList',[]);
  })

  describe('addTodoList',function () {
    it('should add a list',function () {
      let repo = [{todo: "1"},{todo: "2"}];
      user.addTodoList(repo);
      assert.deepEqual(user.todoList,repo);
    })
  })

  describe('emptyList',function () {
    it('should clear list',function () {
      let repo = [{todo: "1"},{todo: "2"}];
      user.addTodoList(repo);
      user.emptyList();
      assert.deepEqual(user.todoList,[]);
    })
  })

  describe('addTodo',function () {
    it('should be able to add a todo',function () {
      let todo = {id: 1,hi: 'hello'};
      user.addTodo(todo);
      assert.include(user.todoList,todo);
    })
  })
})
