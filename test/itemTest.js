let chai = require('chai');
let assert = chai.assert;
const Item = require('../models/item.js');

let item = {};

describe('Item', () => {
  beforeEach(() => {
    item = new Item('this is a text');
  });

  it('should return for item not done', () => {
    assert.isNotOk(item.isItemDone());
  });

  it('should update text to new text', () => {
    item.changeText("hello")
    assert.equal(item.text, "hello");
  });

  it('should give text of item', () => {
    let actual = item.getText();
    assert.equal(actual, 'this is a text');
  });

  it('should mark item as done', () => {
    let actual = item.markAsDone();
    assert.isOk(item.isItemDone());
  });

})
