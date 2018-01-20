class User {
  constructor(name,id,todoList) {
    this.name = name;
    this.id = id;
    this.todoList = todoList || [];
    this.deletedTodos = [];
  }

  emptyList(repo) {
    return this.todoList = [];
  }

  addTodo(todo) {
    return this.todoList.push(todo);
  }

  fetchTodo(todoId) {
    return this.todoList.find(todo => todo.id == todoId);
  }

  deleteTodo(todoId) {
    let todoIndex=this.todoList.findIndex((todo)=>todo.id==todoId);
    let todo = this.todoList[todoIndex];
    this.deletedTodos.push(todo);
    this.todoList.splice(todoIndex,1);
  }
}
module.exports = User;
