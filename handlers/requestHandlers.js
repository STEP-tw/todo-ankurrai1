const fs = require('fs');
const lib = require('./helperLib.js');
const Todo = require('../models/todo.js');
const Item = require('../models/item.js');
const Counter = require('../models/counter.js').Counter;
const usersRepoPath = lib.getUsersRepoPath();
var usersData = lib.fromJSON(lib.getFileContents(usersRepoPath));
//-----------------------------handlers---------------------------------//
const respondWith404=function (req,res) {
 res.status(404).send('File not found!');
};


const handleTresspassing = function(req, res, next) {
  debugger;
  let userName = lib.getCookie(req, 'user');
  let validUrls = ['/login', '/style/index.css', '/image/todo.jpg', '/'];
  if (!userName && !lib.urlIsOneOf(validUrls,req.url) && lib.fileExists(fs,req.url)) {
    res.set('Set-Cookie', 'message=Kindly login for more access; Max-Age=5');
    res.redirect('login');
  }
  next();
};

const serveLanding = function(req, res) {
  debugger;
  if (lib.getCookie(req, 'user')) {
    res.redirect('home');
  } else {
    let data = lib.getFileContents('./public/login.html');
    data = data.replace('loginFailedMessage', lib.getCookie(req, 'message') || '');
    res.set('Content-Type', 'text/html');
    res.send(data);
  }
}


const handleLogin = function(req, res) {
  let user = lib.getValidUser(req);
  if (!user)
    return lib.redirectInvalidUser(res);
  lib.setCookie(res, user);
  lib.ifNewUserCreateRepo(req,usersData);
  res.redirect('home');
};


const serveHomePage = function(req, res) {
  let filePath = lib.getFilePath(req) + '.html';
  let data = lib.getFileContents(filePath);
  let userName = lib.getCookie(req, 'user');
  let textToReplace = 'user';
  data = lib.replacePageContent(data,textToReplace,userName);
  res.set('Content-Type', lib.getContentType(filePath));
  res.send(data);
};

const getTodoList = function (req,res) {
  debugger;
  let user = lib.getUserWithBehaviour(usersData,req);
  let todos = user.todoList;
  todos = lib.toJsonString(todos);
  res.set('Content-Type',lib.getContentType('todos.txt'));
  res.send(todos);
};

const handleNewTodo = function(req, res) {
  let fileContent = lib.getFileContents(lib.getFilePath(req)+ '.html');
  res.set('Content-Type', 'text/html');
  res.send(fileContent)
};

const addTodo = function(req, res) {
  debugger;
  let user = lib.getUserWithBehaviour(usersData,req);
  let title = lib.getTitle(req);
  let description = lib.getDescription(req);
  let todo = new Todo(lib.generateId(user.todoCount), title, description);
  user.addTodo(todo);
  let userPosition = usersData.findIndex(everyUser => user.id == everyUser.id);
  lib.updateData(usersData,usersRepoPath);
  res.redirect('home');
};

const editTodo=function (req,res) {
  let user=lib.getUserWithBehaviour(usersData,req);
  let todo=user.fetchTodo(lib.getCookie(req,'todoId'));
  todo=lib.retriveBehaviour(Todo,todo);
  todo.editTitle(lib.getTitle(req));
  todo.editDescription(lib.getDescription(req));
  user.replaceTodo(todo);
  lib.updateData(usersData,usersRepoPath);
  res.set('Set-Cookie', 'todoId=0; Max-Age=0');
  res.redirect('home');
};

const deleteTodo = function (req,res) {
  debugger
  let user=lib.getUserWithBehaviour(usersData,req);
  user.deleteTodo(lib.getTodoId(req));
  lib.updateData(usersData,usersRepoPath);
  res.sendStatus(201);
  res.end();
}

const viewItems = function (req,res) {
  let user = lib.getUserWithBehaviour(usersData,req);
  let todoId = lib.getTodoId(req);
  let todo = user.fetchTodo(todoId);
  res.set('Set-Cookie', `todoId=${todoId}`);
  res.send(lib.toJsonString(todo));
}
const addItem=function (req,res) {
  let user = lib.getUserWithBehaviour(usersData,req);
  let todo = user.fetchTodo(lib.getTodoId(req));
  todo = lib.retriveBehaviour(Todo,todo);
  let item = new Item(lib.generateId(todo.itemCount),req.body.item);
  todo.addItem(item);
  user.replaceTodo(todo);
  lib.updateData(usersData,usersRepoPath);
  viewItems(req,res);
}

const deleteItems=function (req,res) {
  let user = lib.getUserWithBehaviour(usersData,req);
  let todo = user.fetchTodo(lib.getTodoId(req));
  todo = lib.retriveBehaviour(Todo,todo);
  todo.deleteItem(req.body.itemId);
  user.replaceTodo(todo);
  lib.updateData(usersData,usersRepoPath);
  res.sendStatus(201);
  res.end();
}

const logoutUser = function(req, res) {
  res.set('Set-Cookie', [`sessionid=0; Max-Age=0`, `user=''; Max-Age=0`]);
  res.redirect('login');
};


module.exports = {
  serveLanding,
  serveHomePage,
  logoutUser,
  handleNewTodo,
  handleLogin,
  addTodo,
  handleTresspassing,
  getTodoList,
  editTodo,
  deleteTodo,
  viewItems,
  respondWith404,
  addItem,
  deleteItems
}
