let isIndex = type => type == "index";
let Item=require("./item.js");
const retriveBehaviour = function(classObj, jsonObj={}) {
  return obj = new classObj(...Object.values(jsonObj));
};

let fetch = function(todoList, todoId, type="todo") {
  if (isIndex(type)) {
    return todoList.findIndex((todo) => todo.id == todoId);
  }
  return todoList.find(todo => todo.id == todoId);
};


class Todo{
  constructor(id,title,description,items,deletedItems){
    this.id=id;
    this.title = title;
    this.description = description||"";
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

  replaceItem(item){
    let position=fetch(this.items,item.id,"index");
    this.items[position]=item;
  }

  addItem(item) {
    this.items.push(item);
  }

  editItem(id,text) {
    let item=fetch(this.items,id);
    item = retriveBehaviour(Item,item);
    item.changeText(text);
    this.replaceItem(item);
  }

  getItemStatus(id) {
    let item=fetch(this.items,id);
    return item.isItemDone();
  }

  markItemAsDone(id) {
    let item=fetch(this.items,id);
    item = retriveBehaviour(Item,item);
    item.markAsDone();
    this.replaceItem(item);
  }

  markItemAsUndone(id) {
    let item=fetch(this.items,id);
    item = retriveBehaviour(Item,item);
    item.markAsNotDone();
    this.replaceItem(item);
  }

  deleteItem(id) {
    let itemIndex=fetch(this.items,id,"index");
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
