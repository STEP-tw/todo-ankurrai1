let counter = 0;

const getNewItemBox = function() {
  let item = document.getElementById('item');
  let orderedList = document.getElementById('items');
  let listItem = document.createElement('li');
  listItem.name=++counter;
  listItem.innerText=item.value;
  orderedList.appendChild(listItem);
  item.value="";
}
