let isIndex = type => type == "index";

let fetch = function(todoList, todoId, type="todo") {
	
	if (isIndex(type)) {
		return todoList.findIndex((todo) => todo.id == todoId);
	}
	return todoList.find(todo => todo.id == todoId);
};

class User {
	constructor(name, id, todoList,deletedTodos) {
		this.name = name;
		this.id = id;
		this.todoList = todoList || [];
		this.deletedTodos = deletedTodos||[];
	}

	emptyList(repo) {
		return this.todoList = [];
	}

	addTodo(todo) {
		return this.todoList.push(todo);
	}

	fetchTodo(todoId) {
		return fetch(this.todoList, todoId);
	}

	deleteTodo(todoId) {
		
		let todoIndex = fetch(this.todoList,todoId,"index");
		let todo = fetch(this.todoList, todoId);
		this.deletedTodos.push(todo);
		this.todoList.splice(todoIndex, 1);
	}

	replaceTodo(todo) {
		let position = fetch(this.todoList, todo.id,"index");
		this.todoList[position]=todo;
	}

	get todoCount(){
		return this.todoList.length + this.deletedTodos.length;
	}
}
module.exports = User;
