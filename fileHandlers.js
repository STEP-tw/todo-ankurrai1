const fs = require('fs');
const User = require('./models/user.js');
const lib = require('./handlersHelpLib.js');
const Todo = require('./models/todo.js');
const Counter = require('./models/counter.js').Counter;

const getCookie = function(req, cookieName) {
  return req.cookies[`${cookieName}`] || req.cookies[` ${cookieName}`];
};

const retriveBehaviour = function(classObj, jsonObj) {
  return obj = new classObj(...Object.values(jsonObj));
};

const getUser = function(userName) {
  let user = usersData.find(user => user.name == userName);
  return retriveBehaviour(User, user);
};

const getTitle = function(req) {
  return req.body.title;
};

const updateData = function() {
  let data = toJsonString(usersData);
  fs.writeFileSync('./data/data.json',data);
  debugger;
};

const getDescription = function(req) {
  return req.body.description;
};

const toJsonString = o => JSON.stringify(o, null, 2);

var usersData = lib.fromJSON(lib.getFileContents('./data/data.json'));
//-----------------------------handlers---------------------------------//
const serveLanding = function(req, res) {
  debugger;
  if (getCookie(req, 'user')) {
    res.redirect('home');
  } else {
    let data = lib.getFileContents('./public/login.html');
    data = data.replace('loginFailedMessage', getCookie(req, 'message') || '');
    res.setHeader('Content-Type', 'text/html');
    res.serve(data);
  }
}

const handleTresspassing = function(req, res) {
  let userName = getCookie(req, 'user');
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
  let userName = getCookie(req, 'user') || '';
  data = data.replace('user', userName);
  res.serve(data);
};

const ifNewUserCreateRepo = function (req) {
  let userName = req.body.userName;
  if (!usersData.find(user=>user==userName)) {
    let userId=new Counter(usersData.length);
    let newUser=new User(userName,userId.increment());
    usersData.push(newUser);
    updateData();
    debugger;
  }
  console.log(usersData);
}
const handleLogin = function(req, res) {
  let user = lib.getValidUser(req);
  if (!user)
    return lib.redirectInvalidUser(res);
  lib.setCookie(res, user);
  ifNewUserCreateRepo(req);
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
  let userName = getCookie(req, 'user');
  let user = getUser(userName);
  let title = getTitle(req);
  let description = getDescription(req);
  let idCounter = new Counter(user.todoCount);
  let todo = new Todo(idCounter.increment(), title, description);
  user.addTodo(todo);
  let userPosition = usersData.findIndex(everyUser => user.id == everyUser.id);
  updateData();
  res.redirect('home');
};

const resondWithTodo = function(req, res) {
  debugger;
  let userName = getCookie(req, 'user') || '';
  let todoId = req.cookies[' todoId'] || '';
  let todos = lib.getAllTodo(userName);
  let todo = todos.find((todo) => todo.id == todoId);
  todo = JSON.stringify(todo);
  console.log(todo);
  res.serve(todo);
};

const resondWithTodos = function(req, res) {
  let userName = getCookie(req, 'user') || '';
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
