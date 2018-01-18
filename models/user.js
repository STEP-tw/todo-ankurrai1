const Todo = require('./todo.js');


let Users = function(userTodos) {
  this.userTodos = userTodos;
  this.counter = 0;
};

Users.prototype = {

  addNewTodo: function(todoDetails) {
    let title=todoDetails.Title;
    let description=todoDetails.description;
    let newTodo=new Todo(++this.counter, title, description);
    let items=todoDetails.item||[];
    items.forEach((item)=>{
      newTodo.addItem(item);
    });
    this.userTodos.push(newTodo);
  },

  getUserTodos:function () {
    return this.userTodos;
  }
}

module.exports = Users;
