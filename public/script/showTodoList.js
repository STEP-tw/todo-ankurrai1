let createRequest = function (callBackFunction,contentRequested,bodyMessage=null,method='GET') {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", callBackFunction);
  xhr.open(method, contentRequested);
  xhr.setRequestHeader('Content-Type','text/plain');
  console.log('this is the ',bodyMessage);
  xhr.send(JSON.stringify(bodyMessage));
}

let showTodo = function () {
  alert(this.responseText)
};

function displayTitleWithDesc(todo,index) {
  let id = todo.id;
  return `
  <div class="todoBlock">
  <h5>title - ${todo.title}<h5>
  <p>description - ${todo.description}</p>
  <input type="button" onclick="edit(${index},${id})" name="edit" value="edit">
  <input type="button" onclick="delete(${index},${id})" name="edit" value="Delete">
  </div>
  `
}
let showTodoList = function() {
  let todos = JSON.parse(this.responseText);
  let todoDiv = document.getElementById('todos');
  todos.forEach((todo,index)=>{
    let list = document.createElement('li');
    let TodoDetails =displayTitleWithDesc(todo,index);
    // list.onclick = () =>TodoDetails;
    list.innerHTML = TodoDetails;
    todoDiv.appendChild(list);
  });
};

const getAllTodo = function(){
  createRequest(showTodoList,'userTodos');
};

window.onload = getAllTodo;
