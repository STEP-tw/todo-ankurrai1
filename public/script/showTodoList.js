let createRequest = function(callBack, url, body = null, method = "GET") {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", callBack);
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(body);
};

let deleteTodo = function(index, todoId) {
  event.target.parentElement.parentElement.remove();
  createRequest(null, "deleteTodo", `todoId=${todoId}`, "POST");
};
let deleteItem = function(index, itemId) {
  event.target.parentElement.remove();
  createRequest(null, "deleteItem", `itemId=${itemId}`, "POST");
};

let showTodoList = function() {
  let todos = JSON.parse(this.responseText);
  let todoDiv = document.getElementById("todos");
  todos.forEach((todo, index) => {
    let list = document.createElement("li");
    let TodoDetails = displayTitleWithDesc(todo, index);
    // list.onclick = () =>TodoDetails;
    list.innerHTML = TodoDetails;
    todoDiv.appendChild(list);
  });
};

const getAllTodo = function() {
  createRequest(showTodoList, "userTodos");
};

window.onload = getAllTodo;
