const Item = require('./item.js');

const SingleTodo = function(title, description = "") {
  this.title = title;
  this.description = description;
  this.items = {};
  this.counter = 0;
};

SingleTodo.prototype = {

  addItem: function(text) {
    this.items[++this.counter] = new Item(text);
  },

  editAItem:function (counter,text) {
    this.items[counter].changetext(text);
  },

  getItemStatus:function (counter) {
    this.items[counter].isItemDone();
  },

  markItemAsDone:function (counter) {
    this.items[counter].markAsDone();
  },

  deleteAItem: function(counter) {
    delete this.items[counter];
  },

  getAllItem: function() {
    return this.items;
  },

  getAItem:function (counter) {
    return this.items[counter];
  },

  retitle: function(newTitle) {
    this.title = newTitle;
  },

  getTitle: function() {
    return this.title;
  },

  getDiscription:function () {
    return this.description;
  },

  editDescription: function(newDescription) {
    this.description = newDescription;
  }

};

module.exports = SingleTodo;
