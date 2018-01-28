let isIndex = type => type == 'index';

let fetch = function(todoList, todoId, type='todo') {
  if (isIndex(type)) {
    return todoList.findIndex((todo) => todo.id == todoId);
  }
    return todoList.find(todo => todo.id == todoId);
}

class Todo{
  constructor(id,title,description,items,deletedItems){
    this.id=id;
    this.title = title;
    this.description = description||'';
    this.items = items || [];
    this.deletedItems = deletedItems || [];
  }

  editTitle(newTitle) {
    this.title = newTitle;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  editDescription(newDescription) {
    this.description = newDescription;
  }

  addItem(item) {
    this.items.push(item);
  }

  editItem(id,text) {
    let item=fetch(this.items,id);
    item.changeText(text);
  }

  getItemStatus(id) {
    let item=fetch(this.items,id);
    return item.isItemDone();
  }

  markItemAsDone(id) {
    let item=fetch(this.items,id);
    return item.markAsDone();
  }

  markItemAsUndone(id) {
    let item=fetch(this.items,id);
    item.markAsNotDone();
  }

  deleteItem(id) {
    let itemIndex=fetch(this.items,id,'index');
    this.deletedItems.push(fetch(this.items,id));
    this.items.splice(itemIndex,1);
  }

  get allItems() {
    return this.items;
  }

  get itemCount() {
    return this.items.length + this.deletedItems.length;
  }
}
module.exports=Todo;
