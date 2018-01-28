let chai = require('chai');
let assert = chai.assert;
let Todo = require('../models/todo.js');
let Item=require('../models/item.js');

let todo, item;

describe('Todo',()=>{
  beforeEach(() => {
    todo =new Todo(1,"title","description");
    item=new Item(1,"a Item")
    todo.addItem(item);
  })

  describe('todo\'s state',function () {
    it('should have an id',function () {
      assert.propertyVal(todo,'id',1);
    })

    it('should have a title',function () {
      assert.propertyVal(todo,'title','title');
    })

    it('should have a description if initially given',function () {
      assert.propertyVal(todo,'description','description');
    })

    it('should have empty string if description not given',function () {
      let todo2 = new Todo(3,'title');
      assert.propertyVal(todo2,'description','');
    })

    it('should have a given list of items',function () {
      let items = [2,3];
      let todo = new Todo(3,'title',null,items)
      assert.propertyVal(todo,'items',items);
    })

    it('should have empty list if items not given',function () {
      let todo = new Todo(3,'title');
      assert.deepPropertyVal(todo,'items',[]);
    })

    it('should have a given list of deleted items',function () {
      let deletedItems = [2,3];
      let todo = new Todo(3,'title',null,null,deletedItems)
      assert.propertyVal(todo,'deletedItems',deletedItems);
    })

    it('should have a given list of deleted items',function () {
      assert.deepPropertyVal(todo,'deletedItems',[]);
    })
  })

  describe('should change Title',()=>{
    it('editTitle save new text as title',()=>{
      let expected="new title"
      todo.editTitle("new title");
      assert.propertyVal(todo,'title',expected);
    })
  })
  describe('edit description',()=>{
    it('should change Description',()=>{
      let expected ="new Description";
      todo.editDescription("new Description");
      assert.propertyVal(todo,'description',expected);
    })
  })
  describe('add new item',()=>{
    it('should add new item in items',()=>{
      todo.addItem(item);
      assert.deepInclude(todo.items,item);
    })
  })
  describe('delete Item',()=>{
    it('should delete a item ',()=>{
      todo.deleteItem(item);
      assert.notDeepInclude(todo.items,item);
    })
  })
  describe('getItemStatus',()=>{
    it('should give false for undone item ',()=>{
      assert.isNotOk(todo.getItemStatus(1));
    })
  })
  describe('edit Item',()=>{
    it('should edit an item',()=>{
      todo.editItem(1,"newItem");
      let expected={id:1,text:"newItem",done:false}
      assert.deepInclude(todo.items,expected);
    })
  })
  describe('markAsDone',()=>{
    it('should mark an Item as done',()=>{
      todo.markItemAsDone(1);
      assert.isOk(todo.getItemStatus(1));
    })
  })
  describe('markItemAsUndone',()=>{
    it('should mark Item as not Done',()=>{
      todo.markItemAsUndone(1);
      assert.isNotOk(todo.getItemStatus(1));
    })
  })
  describe('get items',()=>{
    it('should give all todo items',()=>{
      assert.deepInclude(todo.allItems,item);
    })
  })
  describe('get title',()=>{
    it('should give title of todo',()=>{
      assert.equal(todo.getTitle(),"title");
    })
  })
  describe('get description',()=>{
    it('should give description of todo',()=>{
      assert.equal(todo.getDescription(),"description");
    })
  })

  describe('get itemCount',function () {
    it('should give the total no of items the todo holds',function () {
      assert.equal(todo.itemCount,1);
    })
  })
})
