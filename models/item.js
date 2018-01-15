const Item = function(text) {
  this.text = text;
  this.isDone = false;
}

Item.prototype ={
  markAsDone:function(){
    this.isDone = true;
  },

  isItemDone:function(){
    return this.isDone;
  },

  getText:function(){
    return this.text;
  },

  changetext:function(newText){
    this.text = newText;
  },

  deleteItem:function () {
    delete this.text;
  }
}

module.exports = Item;
