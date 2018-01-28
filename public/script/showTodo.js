function disappear() {
  event.target.parentElement.parentElement.remove();
}

function getSubmitButton(name) {
  return `<button type="submit" >${name}</button>`;
}

function getResetButton() {
  return '<button type="reset" value="Reset">Reset</button>';
}

function getCancelButton() {
  return '<button type="button" name="cancel" onclick="disappear()">cancel</button>';
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
    ${getSubmitButton('Submit')}
    ${getResetButton()}
    ${getCancelButton()}
  </form>`;

  let todoBlock = document.getElementsByClassName('todoBlock');
  let editButton = document.getElementById('unique');
  if (editButton) {
    return;
  }
  let newdiv = document.createElement('div');
  newdiv.setAttribute("id", "unique");
  newdiv.innerHTML = contents;
  todoBlock[index].appendChild(newdiv);
}

function editItem(index, id) {
  let itemBox = getItemBox('edit');
  let item = document.getElementById(id);
  let edit = document.getElementById('uniqueEdit');
  if (edit) {
    return;
  }
  let newdiv = document.createElement('div');
  newdiv.setAttribute("id", "uniqueEdit");
  newdiv.innerHTML = itemBox;
  let itemBoxDiv = document.createElement('div');
  newdiv.childNodes[3].onclick = function() {
    let itemText = newdiv.firstElementChild.value;
    saveItem(`${itemText}&itemId=${id}`,'editItem');
  }
  itemBoxDiv.appendChild(newdiv);
  item.appendChild(itemBoxDiv);
};

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
  list.id = item.id;
  let itemText = item.text + getEditButton(index, item.id, 'editItem') +
    getDeleteButton(index, item.id, 'deleteItem');
  list.innerHTML = itemText;
  itemsList.appendChild(list);
}

function showItems() {
  let todo = JSON.parse(this.responseText);
  let rightMenu = document.getElementById('rightMenuTitle');
  let todoTitle = getTitle(todo);
  let items = todo.items;
  let itemList = document.getElementById('itemsList');
  rightMenuTitle.innerHTML = todoTitle;
  itemList.innerHTML = '';
  items.forEach(displayEachItem);
  let addItemButton = document.createElement('button');
  addItemButton.innerHTML = 'add Item'
  addItemButton.onclick = getNewItemBox;
  itemList.appendChild(addItemButton);
}

function displayItems(todoId) {
  createRequest(showItems, 'viewItems', `todoId=${todoId}`, 'POST')
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

function getItemBox(action) {
  return `
  <input type="text" name="item" value="">
  ${getSubmitButton(action)}
  ${getResetButton()}
  ${getCancelButton()}
  `;
}

function saveItem(itemText, requestUrl) {
  createRequest(showItems, requestUrl, `item=${itemText}`, 'POST');
};

function getNewItemBox() {
  if (document.getElementById('itemBox')) {
    return;
  }
  let orderedList = document.getElementById('itemsList');
  let addItem = document.createElement('div');
  addItem.setAttribute('id', 'itemBox');
  let addItemContents = document.createElement('div');
  addItemContents.id = "itemBoxContents";
  addItemContents.innerHTML = getItemBox('addItem');
  addItemContents.childNodes[3].onclick = function() {
    let itemText = addItemContents.firstElementChild.value;
    saveItem(itemText, 'addItem');
  }
  addItem.appendChild(addItemContents);
  orderedList.appendChild(addItem);

}
