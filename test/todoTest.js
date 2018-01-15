let chai = require('chai');
let assert = chai.assert;
const SingleTodo = require('../models/todo.js');

let todo = {};

describe('todo', () => {
  beforeEach(() => {
    todo = new SingleTodo('hello',"there is a discription");
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

  it('should should give the title of todo', () => {
    let actule=todo.getTitle();
    assert.equal(actule,"hello");
  });

  it('should replace title with new one', () => {
    todo.retitle("ankur");
    let actule=todo.getTitle();
    assert.equal(actule,"ankur");
  });

  it('should should give the discription of todo', () => {
    let actule=todo.getDiscription();
    assert.equal(actule,"there is a discription");
  });

  it('should replace discription with new one', () => {
    todo.editDescription("newDiscription");
    let actule=todo.getDiscription();
    assert.equal(actule,"newDiscription");
  });

  it('should replace text Of item', () => {
    todo.addItem("this is a item");
    todo.editAItem(1,"replaced text");
    let actule=todo.getAItem(1).text;
    assert.equal(actule,"replaced text");
  });

  it('should give status of item as done or not', () => {
    todo.addItem("this is a item");
    assert.isNotOk(todo.getItemStatus(1));
  });

  it('should mark item as done', () => {
    todo.addItem("this is a item");
    todo.markItemAsDone(1);
    assert.isOk(todo.getAItem(1).isItemDone());
  });
})
