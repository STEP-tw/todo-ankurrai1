const getTodoAsHtml =function (todo) {
  let counter=0;
  let todoElements=[];
  todoElements.push(`Title : <input type="text" name="" value="${todo.title}"><br>`);
  todoElements.push(`Description : <textarea type="text">${todo.description}</textarea><br>`);

  todo.item.forEach((item)=>{
    counter++;
    todoElements.push(`${counter}: <input type="text" name="" value="${item.text}"><br>`);
  })
  return todoElements.join("<br>");
};

let reqListener = function(){
  let todoData = JSON.parse(this.responseText);
  let div = document.getElementById('form');
  div.innerHTML=getTodoAsHtml(todoData)
};

let viewTodo = function(){
  console.log();
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", 'userTodo');
  oReq.send();
}

window.onload = viewTodo;
