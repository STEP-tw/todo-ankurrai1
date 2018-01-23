let createRequest = function(callBackFunction, contentRequested, bodyMessage = null, method = 'GET') {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", callBackFunction);
  xhr.open(method, contentRequested);
  xhr.setRequestHeader('Content-Type', 'text/plain');
  console.log('this is the ', bodyMessage);
  xhr.send(bodyMessage);
}

let deleteTodo = function(index, todoId) {
  event.target.parentElement.parentElement.parentElement.remove();
  createRequest(()=>{}, "deleteTodo", `todoId=${todoId}`, 'POST');
};

let showTodo = function() {
  alert(this.responseText)
};

let showTodoList = function() {
  let todos = JSON.parse(this.responseText);
  let todoDiv = document.getElementById('todos');
  todos.forEach((todo, index) => {
    let list = document.createElement('li');
    let TodoDetails = displayTitleWithDesc(todo, index);
    // list.onclick = () =>TodoDetails;
    list.innerHTML = TodoDetails;
    todoDiv.appendChild(list);
  });
};

const getAllTodo = function() {
  createRequest(showTodoList, 'userTodos');
};

window.onload = getAllTodo;
