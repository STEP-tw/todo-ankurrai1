let chai = require('chai');
let assert = chai.assert;
const User = require('../models/user.js');

let user = {};

describe('Users', () => {

  let userTodo = {
    Title: 'my Todo',
    description: 'something',
    item: []
  };

  beforeEach(() => {
    user = new User([]);
    user.addNewTodo(userTodo);
  });

  it('should give title of user\'s todo ', () => {
    let todo = user.userTodos[0];
    console.log();
    let title = todo.getTitle();
    assert.equal(title, 'my Todo');
  });

  it('should give description of user\'s todo', () => {
    let todo = user.userTodos[0];
    let description = todo.getDescription();
    assert.equal(description, 'something');
  });

  it('should give items', () => {
    let todo = user.userTodos[0];
    let items = todo.getAllItem();
    assert.deepEqual(items, []);
  });
  it('should give user\'s  all todo', () => {
    let actual = user.getUserTodos();
    let expected = [{
      id: 1,
      title: 'my Todo',
      description: 'something',
      items: [],
      counter: 0
    }]
    assert.deepEqual(actual, expected);
  });
})
