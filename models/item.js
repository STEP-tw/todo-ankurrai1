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
    return this._title;
  },

  changetext:function(newText){
    this.text = newText;
  }
}

module.exports = Item;
