const Item = require('./item.js');
const SingleTodo = function(title, description = "") {
  this.title = title;
  this.description = description;
  this.items = {};
  this.counter = 0;
};

SingleTodo.prototype = {

  addItem: function(itemTitle) {
    this.items[++counter] = new Item(text);
  },
};

module.exports = SingleTodo;
