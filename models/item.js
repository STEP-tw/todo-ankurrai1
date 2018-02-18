class Item {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.done = false;
  }
  markAsDone() {
    this.done = true;
    return this.done;
  }
  isItemDone() {
    return this.done;
  }
  changeText(newText) {
    this.text = newText;
    return this.text;
  }
  markAsNotDone() {
    this.done = false;
    return this.done;
  }
}


module.exports = Item;