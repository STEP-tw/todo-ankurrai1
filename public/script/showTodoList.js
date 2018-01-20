let showTodoList = function() {
  console.log(this.responseText);
  let todos = JSON.parse(this.responseText);
  let todoDiv = document.getElementById('todos');
  todos.forEach((todo)=>{
    let reference = document.createElement('a');
    reference.href = `/todo_${todo.id}`;
    reference.innerText = todo.title;
    todoDiv.appendChild(reference);
    todoDiv.appendChild(document.createElement('br'));
  });
}

const getAllTodo = function(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", showTodoList);
  oReq.open("GET", `userTodos`);
  oReq.send();
}

window.onload = getAllTodo;
