let chai = require('chai');
let assert = chai.assert;
let Todo = require('../models/todo.js');

let todo={};

describe('Todo',()=>{
  beforeEach(() => {
    todo =new Todo(1,"somthing","there is a description");;
  });
  describe('new todo',()=>{
    it('should give new todo',()=>{
      let expected = {id:1,title:"somthing",description:"there is a description",items:[],counter:0};
      assert.deepEqual(expected,todo);
    })
  })
  describe('should change Title',()=>{
    it('retitle save new text as title',()=>{
      let expected="new title"
      todo.retitle("new title");
      assert.equal(expected,todo.title);
    })
  })
  describe('edit description',()=>{
    it('should change Description',()=>{
      let expected ="new Description";
      todo.editDescription("new Description");
      assert.equal(expected,todo.description);
    })
  })
  describe('add new item',()=>{
    it('should add new item in items',()=>{
      let items =[{text:"a Item",id:1,done:false}];
      todo.addItem("a Item");
      assert.deepEqual(items,todo.items);
    })
  })
  describe('delete Item',()=>{
    it('should delete a item ',()=>{
      todo.addItem("new item");
      todo.deleteAItem(1);
      assert.deepEqual(todo.items,[]);
    })
  })
  describe('edit Item',()=>{
    it('should edit a item text',()=>{
      todo.addItem("item",false);
      todo.editAItem(1,"newItem");
      let expected=[{id:1,text:"newItem",done:false}]
      assert.deepEqual(todo.items,expected);
    })
  })
  describe('markAsDone',()=>{
    it('should mark Item as done',()=>{
      todo.addItem("new Item");
      todo.markItemAsDone(1);
      let expected=[{id:1,text:"new Item",done:true}]
      assert.deepEqual(todo.items,expected);
    })
  })
  describe('markItemAsUndone',()=>{
    it('should mark Item as not Done',()=>{
      todo.addItem("A item");
      todo.markItemAsUndone(1);
      let expected=[{id:1,text:"A item",done:false}]
      assert.deepEqual(todo.items,expected);
    })
  })
  describe('get items',()=>{
    it('should give all todo items',()=>{
      todo.addItem("A item");
      let expected=[{id:1,text:"A item",done:false}]
      assert.deepEqual(todo.getAllItem(),expected);
    })
  })
  describe('get title',()=>{
    it('should give title of todo',()=>{
      assert.equal(todo.getTitle(),"somthing");
    })
  })
  describe('get description',()=>{
    it('should give description of todo',()=>{
      assert.equal(todo.getDescription(),"there is a description");
    })
  })
})
