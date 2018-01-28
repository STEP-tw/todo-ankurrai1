function disappear() {
  location.reload();
}

function edit(index, id) {
  document.cookie = `todoId=${id}`;
  let contents = `
  <form id="unique" method="post" action="/editTodo">
    <p class="edit">edit title:</p>
    <textarea name="title" rows="1" cols="20"></textarea>
    <br>
    <p class="edit">edit description:</p>
    <textarea name="description" rows="2" cols="30"></textarea><br>
    <button type="submit" >Submit</button>
    <button type="reset" value="Reset">Reset</button>
    <button type="button" name="cancel" onclick="disappear()">cancel</button>
  </form>`;

  let todoBlock = document.getElementsByClassName('todoBlock');
  let uniqueDiv = document.getElementById('unique');
  if (uniqueDiv) {
    return;
  }
  let newdiv = document.createElement('div');
  newdiv.setAttribute("id", "unique");
  newdiv.innerHTML = contents;
  todoBlock[index].appendChild(newdiv);
}

function getTitle(todo) {
  return ` ${todo.title}`;
}

function getDescription(todo) {
  return `<p class="desc" >${todo.description}</p>`;
}

function getEditButton(index, id, callBack) {
  return `<input type="button" onclick="${callBack}(${index},${id})" name="edit" value="edit">`;
}

function getDeleteButton(index, id, callBack) {
  return `<input type="button" onclick="${callBack}(${index},${id})" value="Delete">`;
}


function displayEachItem(item, index) {
  let itemsList = document.getElementById('itemsList');
  let list = document.createElement('li');
  let itemText = item.text;
  list.innerHTML = itemText;
  itemsList.appendChild(list);
}

function showItems() {
  let todo = JSON.parse(this.responseText);
  let rightMenu = document.getElementById('rightMenuTitle');
  document.getElementById('itemsList').innerHTML = '';
  let todoTitle = getTitle(todo);
  rightMenuTitle.innerHTML = todoTitle;
  let items = todo.items;
  items.forEach(displayEachItem);
}

function displayItems(todoId) {
  createRequest(showItems, 'viewItems', `todoId=${todoId}`, `POST`)
}

function displayTitleWithDesc(todo, index) {
  let id = todo.id;
  return `
  <details class="todoBlock">
  <summary><span class="title" onclick=displayItems(${id})>${getTitle(todo)}</span></summary>
  ${getDescription(todo)}
  ${getEditButton(index,id,'edit')}
  ${getDeleteButton(index,id,'deleteTodo')}
  </details>`
}

const getNewItemBox = function() {
  let orderedList = document.getElementById('items');
  let item = document.createElement('li');
  let input = document.createElement('input');
  input.name = 'item';
  orderedList.appendChild(item);
  item.appendChild(input);
}
