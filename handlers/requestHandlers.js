const fs = require('fs');
const lib = require('./helperLib.js');
const Todo = require('../models/todo.js');
const Counter = require('../models/counter.js').Counter;
const usersRepoPath = process.env.usersRepo || '../data/data.json';
var usersData = lib.fromJSON(lib.getFileContents(usersRepoPath));
//-----------------------------handlers---------------------------------//
const serveLanding = function(req, res) {
  debugger;
  if (lib.getCookie(req, 'user')) {
    res.redirect('home');
  } else {
    let data = lib.getFileContents('./public/login.html');
    data = data.replace('loginFailedMessage', lib.getCookie(req, 'message') || '');
    res.setHeader('Content-Type', 'text/html');
    res.serve(data);
  }
}

const handleTresspassing = function(req, res) {
  let userName = lib.getCookie(req, 'user');
  let validUrls = ['/login', '/style/index.css', '/image/todo.jpg', '/'];
  debugger;
  if (!userName && !req.urlIsOneOf(validUrls) && req.fileExists(fs)) {
    res.setHeader('Set-Cookie', 'message=Kindly login for more access; Max-Age=5');
    res.redirect('login');
  }
};
const serveRegularFile = function(req, res) {
  let filePath = req.url;
  fs.readFile(`./public${filePath}`, (error, data) => {
    if (error) return res.resondWithError();
    res.setHeader('Content-Type', lib.getContentType(filePath))
    res.serve(data);
  });
};

const serveHomePage = function(req, res) {
  debugger;
  let data = lib.getFileContents(`./public/home.html`);
  let userName = lib.getCookie(req, 'user') || '';
  data = data.replace('user', userName);
  res.serve(data);
};

const handleLogin = function(req, res) {
  let user = lib.getValidUser(req);
  if (!user)
    return lib.redirectInvalidUser(res);
  lib.setCookie(res, user);
  lib.ifNewUserCreateRepo(req,usersData);
  res.redirect('home');
};

const logoutUser = function(req, res) {
  res.setHeader('Set-Cookie', [`sessionid=0; Max-Age=0`, `user=''; Max-Age=0`]);
  res.redirect('login');
};

const handleNewTodo = function(req, res) {
  let fileContent = lib.getFileContents('./public/addTodo.html');
  res.serve(fileContent)
};

const addTodo = function(req, res) {
  debugger;
  let userName = lib.getCookie(req, 'user');
  let user = lib.getUser(usersData,userName);
  let title = lib.getTitle(req);
  let description = lib.getDescription(req);
  let idCounter = new Counter(user.todoCount);
  let todo = new Todo(idCounter.increment(), title, description);
  user.addTodo(todo);
  let userPosition = usersData.findIndex(everyUser => user.id == everyUser.id);
  lib.updateData(usersData);
  res.redirect('home');
};

const resondWithTodo = function(req, res) {
  debugger;
  let userName = lib.getCookie(req, 'user') || '';
  let todoId = req.cookies[' todoId'] || '';
  let todos = lib.getAllTodo(userName);
  let todo = todos.find((todo) => todo.id == todoId);
  todo = JSON.stringify(todo);
  console.log(todo);
  res.serve(todo);
};

const resondWithTodos = function(req, res) {
  let userName = lib.getCookie(req, 'user') || '';
  let todos = lib.getAllTodo(userName);
  let todoAsString = JSON.stringify(todos);
  res.serve(todoAsString);
  debugger;
};

const setTitle = function(req, res) {
  let requstUrl = req.url
  if (lib.hasAskedForToDo(req)) {
    let todoId = requstUrl.substr(requstUrl.lastIndexOf("_") + 1);
    res.setHeader('Set-Cookie', `todoId=${todoId}; Max-Age=10`);
    res.redirect('todoToEdit');
  }
};

const resondEditPage = function(req, res) {
  let todoEditPage = lib.getFileContents('./public/todo.html');
  res.serve(todoEditPage)
};

module.exports = {
  serveLanding,
  serveHomePage,
  logoutUser,
  resondWithTodos,
  resondWithTodo,
  resondEditPage,
  handleNewTodo,
  handleLogin,
  addTodo,
  serveRegularFile,
  setTitle,
  handleTresspassing
}
