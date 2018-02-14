const User = require("../models/user.js");
const assert = require("chai").assert;
const Todo = require("../models/todo.js");
let user;

describe("User",function () {
  beforeEach(function () {
    user = new User("ankur",1);
  });

  it("should contain a unique Id",function () {
    assert.propertyVal(user,"id",1);
  });

  it("should contain name",function () {
    assert.propertyVal(user,"name","ankur");
  });

  it("should contain a todo list",function () {
    assert.deepPropertyVal(user,"todoList",[]);
  });

  it("should contain a list of deleted todos",function () {
    assert.deepPropertyVal(user,"deletedTodos",[]);
  });

  describe("emptyList",function () {
    it("should clear list",function () {
      let todo= {todo: "1"};
      user.addTodo(todo);
      user.emptyList();
      assert.deepEqual(user.todoList,[]);
    });
  });

  describe("addTodo",function () {
    it("should be able to add a todo",function () {
      let todo = {id: 1,hi: "hello"};
      user.addTodo(todo);
      assert.include(user.todoList,todo);
    });
  });

  describe("fetchTodo",function () {
    it("should be able to fetch a todo",function () {
      let todo = {id: 1,hi: "hello"};
      user.addTodo(todo);
      let actual = user.fetchTodo(1);
      assert.deepEqual(actual,todo);
    });
  });

  describe("deleteTodo",function () {
    let todo;
    beforeEach(function () {
      todo = {id: 1,hi: "hello"};
      user.addTodo(todo);
      user.deleteTodo(1);
    });
    it("should be able to delete a todo",function () {
      assert.deepEqual(user.todoList,[]);
    });

    it("should add the deleted todo in deletedTodo list",function () {
      assert.deepInclude(user.deletedTodos,todo);
    });
  });

  describe("editTodo",function () {
    it("should replace a given todo",function () {
      let todo = new Todo(2,"title","description");
      user.addTodo(todo);
      user.replaceTodo(todo);
      assert.deepInclude(user.todoList,todo);
    });
  });

  describe("todoCount",function () {
    it("should return no of todos user have ",function () {
      let todo = new Todo(2,"title","description");
      user.addTodo(todo);
      assert.equal(user.todoCount,1);
    });
  });
});
