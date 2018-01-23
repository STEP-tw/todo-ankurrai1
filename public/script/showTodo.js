function disappear() {
  location.reload();
}

function edit(index,id) {
  document.cookie = `todoId=${id}`;
  let contents =  `
  <form id="unique" method="post" action="/editTodo">
    <p class="edit">edit title:</p>
    <textarea name="title" rows="1" cols="20"></textarea>
    <br>
    <p class="edit">edit description:</p>
    <textarea name="description" rows="2" cols="40"></textarea><br>
    <button type="submit" >Submit</button>
    <button type="reset" value="Reset">Reset</button>
    <button type="button" name="cancel" onclick="disappear()">cancel</button>
  </form>`;

  let todoBlock = document.getElementsByClassName('todoBlock');
  let uniqueDiv = document.getElementById('unique');
  if (uniqueDiv) {
    return ;
  }
  let newdiv = document.createElement('div');
  newdiv.setAttribute("id", "unique");
  newdiv.innerHTML = contents;
  todoBlock[index].appendChild(newdiv);
}

function displayTitleWithDesc(todo,index) {
  let id = todo.id;
  return `
  <div class="todoBlock">
  <h5>title - ${todo.title}<h5>
  <p>description - ${todo.description}</p>
  <input type="button" onclick="edit(${index},${id})" name="edit" value="edit">
  <input type="button" onclick="deleteTodo(${index},${id})" value="Delete">
  </div>
  `
}
const getNewItemBox = function() {
  let orderedList = document.getElementById('items');
  let item = document.createElement('li');
  let input = document.createElement('input');
  input.name='item';
  orderedList.appendChild(item);
  item.appendChild(input);
}
