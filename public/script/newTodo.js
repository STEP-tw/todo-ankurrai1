const getNewItemBox = function() {
  let orderedList = document.getElementById('items');
  let item = document.createElement('li');
  let input = document.createElement('input');
  input.name='item';
  orderedList.appendChild(item);
  item.appendChild(input);
}
