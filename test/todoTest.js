let chai = require('chai');
let assert = chai.assert;
const SingleTodo = require('../models/todo.js');

let todo = {};

describe('todo', () => {
  beforeEach(() => {
    todo = new SingleTodo('');
  });

  it('should add a new item in items', () => {
    todo.addItem("this is a item");
    assert.equal(todo.getAItem(1).text,"this is a item");
  });

  it('should delete a item in items', () => {
    todo.addItem("this is a item");
    assert.equal(todo.getAItem(1).text,"this is a item");
    todo.deleteAItem(1);
    assert.equal(todo.getAItem(1),undefined);
  });

  it('should add a new item in items', () => {
    todo.addItem("this is a item");
    todo.addItem("this is a newItem");
    todo.addItem("this is another item");
    let actule=Object.keys(todo.getAllItem()).length
    assert.equal(actule,3);
  });

})
