const Item = require('./item.js');

class Todo{
  constructor(id,title,description){
    this.id=id;
    this.title = title;
    this.description = description||'';
    this.items =[];
    this.counter=0;
  }

  retitle(newTitle) {
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

  addItem(text,status) {
    debugger;
    status=status||false;
    this.counter++;
    this.items.push(new Item(this.counter,text,status));
  }

  editAItem(id,text) {
    let item=this.items.find((item)=>item.id==id)
    item.changeText(text);
  }

  getItemStatus(id) {
    let item=this.items.find((item)=>item.id==id)
    item.isItemDone();
  }

  markItemAsDone(id) {
    let item=this.items.find((item)=>item.id==id)
    item.markAsDone();
  }

  markItemAsUndone(id) {
    let item=this.items.find((item)=>item.id==id)
    item.markAsNotDone();
  }

  deleteAItem(id) {
    let itemIndex=this.items.findIndex((item)=>item.id==id)
    this.items.splice(itemIndex,1);
  }

  getAllItem() {
    return this.items;
  }

}
module.exports=Todo;
