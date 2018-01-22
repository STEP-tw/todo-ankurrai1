const getTodoAsHtml =function (todo) {
  let counter=0;
  let todoElements=[];
  todoElements.push(`<h4>Title :${todo.title}<h4>`);
  todoElements.push(`<h3>Description :${todo.description}<h3>`);
  todo.items.forEach((item)=>{
    todoElements.push(`<h5>${++counter} : ${item.text}<h5>`);
  });
  return todoElements.join("<br>");
};

let showTodo = function(){
  let todoData = JSON.parse(this.responseText);
  let div = document.getElementById('form');
  div.innerHTML=getTodoAsHtml(todoData)
};

let viewTodo = function(){
  console.log();
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", showTodo);
  oReq.open("GET", 'userTodo');
  oReq.send();
}

const getNewItemBox = function() {
  let orderedList = document.getElementById('items');
  let item = document.createElement('li');
  let input = document.createElement('input');
  input.name='item';
  orderedList.appendChild(item);
  item.appendChild(input);
}

window.onload = viewTodo;
