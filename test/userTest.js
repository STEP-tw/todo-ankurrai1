let chai = require('chai');
let assert = chai.assert;
const Users = require('../models/user.js');

let validUsers = [{
  userName: 'ankurrai',
  password: 'ankur'
}, {
  userName: 'yogi',
  password: 'yogi'
}];

let users={};

describe.skip('Users', () => {

  beforeEach(() => {
    users = new Users('./data/data.json',validUsers);
  });

  it('should return given users todo', () => {
    let actual = users.getUserAllTodo("ankur");
    let expected = {
      "hello": {title: "hello",description: "a description",item: {1: {text: "i am a line",
            isDone: false
          },
          counter: 0
        }
      }
    }
    assert.deepEqual(actual, expected);
  });

  it('should give a Todo By Title', () => {
    let actual = users.getTodoByTitle("ankur", "hello");
    let expected = {
      title: "hello",
      description: "a description",
      item: {
        1: {
          text: "i am a line",
          isDone: false
        },
        counter: 0
      }
    }
    assert.deepEqual(actual, expected);
  });

  it('should delete Todo By Title', () => {
    let actual = users.deleteTodoByTitle("ankur", "hello");
    let expected = users.addNewTodo["ankur"]
    assert.equal(actual, expected);
  });

  it('should add Todo with Title ', () => {
    users.addNewTodo("ankur", "hii", "new One description");
    let actual = users.getTodoByTitle("ankur", "hii");
    let expected = {
      title: 'hii',
      description: 'new One description',
      items: {},
      counter: 0
    }
    assert.deepOwnInclude(actual, expected);
  });

})
