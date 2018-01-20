const fs = require('fs');
const User = require('./models/user.js');
const lib = require('./handlersHelpLib.js');

function getCookie(req,cookieName) {
  return req.cookies[`${cookieName}`] || req.cookies[` ${cookieName}`];
}

//-----------------------------handlers---------------------------------//
const serveLanding = function(req, resp) {
  debugger;
  if (getCookie(req,'user')) {
    resp.redirect('home');
  } else {
    let data = lib.getFileContents('./public/login.html');
    data = data.replace('loginFailedMessage', getCookie(req,'message') || '');
    resp.setHeader('Content-Type', 'text/html');
    resp.serve(data);
  }
}

const serveRegularFile = function(req, resp) {
  let filePath = req.url;
  fs.readFile(`./public${filePath}`, (error, data) => {
    if (error) return resp.respondWithError();
    resp.setHeader('Content-Type', lib.getContentType(filePath))
    resp.serve(data);
  });
};

const serveHomePage = function(req, resp) {
  debugger;
  let data = lib.getFileContents(`./public/home.html`);
  let userName = getCookie(req,'user') || '';
  data = data.replace('Guest please login to explore our features', userName);
  resp.serve(data);
};

const handleLogin = function(req, resp) {
  let user = lib.getValidUser(req);
  if (!user)
    return lib.redirectInvalidUser(resp);
  lib.setCookie(resp,user);
  resp.redirect('home');
};

const logoutUser = function(req, resp) {
  resp.setHeader('Set-Cookie', [`sessionid=0; Max-Age=0`, `user=''; Max-Age=0`]);
  resp.redirect('login');
};

const handleNewTodo = function(req, resp) {
  let fileContent = lib.getFileContents('./public/addTodo.html');
  resp.serve(fileContent)
};

const storeNewTodo = function(req, resp) {
  debugger;
  let userName = getCookie(req,'user') || '';
  let userTodos = lib.getAllTodo(userName);
  console.log(req.body);
  todoDetails = req.body
  let user = new User(userTodos);
  user.addNewTodo(todoDetails);
  let UserTodos = user.getUserTodos();
  lib.storeTodos(userName, UserTodos);
  resp.redirect('home');
};

const respondWithTodo = function(req, resp) {
  debugger;
  let userName = getCookie(req,'user') || '';
  let todoId = req.cookies[' todoId'] || '';
  let todos = lib.getAllTodo(userName);
  let todo = todos.find((todo) => todo.id == todoId);
  todo = JSON.stringify(todo);
  console.log(todo);
  resp.serve(todo);
};

const respondWithTodos = function(req, resp) {
  let userName = getCookie(req,'user') || '';
  let todos = lib.getAllTodo(userName);
  let todoAsString = JSON.stringify(todos);
  resp.serve(todoAsString);
};

const setTitle = function(req, resp) {
  let requstUrl = req.url
  if (lib.hasAskedForToDo(req)) {
    let todoId = requstUrl.substr(requstUrl.lastIndexOf("_") + 1);
    resp.setHeader('Set-Cookie', `todoId=${todoId}; Max-Age=10`);
    resp.redirect('todoToEdit');
  }
};

const respondEditPage = function(req, resp) {
  let todoEditPage = lib.getFileContents('./public/todo.html');
  resp.serve(todoEditPage)
};

module.exports = {
  serveLanding,
  serveHomePage,
  logoutUser,
  respondWithTodos,
  respondWithTodo,
  respondEditPage,
  handleNewTodo,
  handleLogin,
  storeNewTodo,
  serveRegularFile,
  setTitle,
}
