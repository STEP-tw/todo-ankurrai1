const fs = require('fs');
const User = require('./models/user.js');
const lib = require('./handlersHelpLib.js');

function getCookie(req,cookieName) {
  return req.cookies[`${cookieName}`] || req.cookies[` ${cookieName}`];
}

//-----------------------------handlers---------------------------------//
const serveLanding = function(req, res) {
  debugger;
  if (getCookie(req,'user')) {
    res.redirect('home');
  } else {
    let data = lib.getFileContents('./public/login.html');
    data = data.replace('loginFailedMessage', getCookie(req,'message') || '');
    res.setHeader('Content-Type', 'text/html');
    res.serve(data);
  }
}

const handleTresspassing = function (req,res) {
  let userName=getCookie(req,'user');
  let validUrls=['/login','/style/index.css','/image/todo.jpg','/'];
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
  let userName = getCookie(req,'user') || '';
  data = data.replace('user', userName);
  res.serve(data);
};

const handleLogin = function(req, res) {
  let user = lib.getValidUser(req);
  if (!user)
    return lib.redirectInvalidUser(res);
  lib.setCookie(res,user);
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

const storeNewTodo = function(req, res) {
  debugger;
  let userName = getCookie(req,'user') || '';
  let userTodos = lib.getAllTodo(userName);
  console.log(req.body);
  todoDetails = req.body
  let user = new User(userTodos);
  user.addNewTodo(todoDetails);
  let UserTodos = user.getUserTodos();
  lib.storeTodos(userName, UserTodos);
  res.redirect('home');
};

const resondWithTodo = function(req, res) {
  debugger;
  let userName = getCookie(req,'user') || '';
  let todoId = req.cookies[' todoId'] || '';
  let todos = lib.getAllTodo(userName);
  let todo = todos.find((todo) => todo.id == todoId);
  todo = JSON.stringify(todo);
  console.log(todo);
  res.serve(todo);
};

const resondWithTodos = function(req, res) {
  let userName = getCookie(req,'user') || '';
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
  storeNewTodo,
  serveRegularFile,
  setTitle,
  handleTresspassing
}
