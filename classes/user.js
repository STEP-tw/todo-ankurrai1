class User {
  constructor(name,id,todoList) {
    this.name = name;
    this.id = id;
    this.todoList = todoList || [];
  }

  addTodoList(repo) {
    return this.todoList = repo;
  }

  emptyList(repo) {
    return this.todoList = [];
  }

  addTodo(todo) {
    return this.todoList.push(todo);
  }
}
module.exports = User;
