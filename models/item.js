class Item {
  constructor(id,text,status) {
    this.id=id
    this.text = text;
    this.done = status||false;
  }
  markAsDone(){
    this.done = true;
  }
  isItemDone(){
    return this.done;
  }
  changeText(newText){
    this.text = newText;
  }
  markAsNotDone() {
    this.done = false;
  }
}
module.exports = Item;
