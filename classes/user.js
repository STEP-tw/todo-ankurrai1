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

  fetchTodo(todoId) {
    return this.todoList.find(todo => todo.id == todoId);
  }
}
module.exports = User;
