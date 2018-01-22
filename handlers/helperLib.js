const usersRepoPath = process.env.usersRepo || '../data/data.json';
const fs = require('fs');
const validUsers = require('../data/validUsers.js').validUsers;
const User = require('../models/user.js');
const Counter = require('../models/counter.js').Counter;


const getUserName = function (req) {
  return req.body.userName;
};

const getPassword = function (req) {
  return req.body.password;
};

const fromJSON = function(str) {
  return JSON.parse(str);
};

const getFileContents = function(url) {
  let contents = fs.readFileSync(url, 'utf8');
  return contents;
};

const getContentType = function(filePath) {
  let fileExt = filePath.split(".").slice(-1)[0];
  let headers = {
    "pdf": "application/pdf",
    "js": "text/js",
    "html": "text/html",
    "css": "text/css",
    "jpg": "image/jpg",
    "gif": "image/gif"
  };
  return headers[fileExt];
};

const getAllTodo = function(userName) {
  let users = fromJSON(getFileContents(usersRepoPath));
  let user = users[userName];
  let todos = user || [];
  return todos;
};

const redirectInvalidUser = function(res) {
  res.setHeader('Set-Cookie', `message=login failed; Max-Age=5`);
  res.redirect('login');
};

const setCookie = function(res, user) {
  let sessionid = new Date().getTime();
  user.sessionid = sessionid;
  res.setHeader('Set-Cookie', [`sessionid=${sessionid}`, `user=${user.userName}`]);
};

const getValidUser = function(req) {
  let userName = getUserName(req);
  let password = getPassword(req);
  return validUsers.find(validUser => {
    return validUser.userName == userName && validUser.password == password;
  });
};

const hasAskedForToDo = (req) => {
  return req.method == 'GET' && req.url.startsWith('/todo_');
}


const getCookie = function(req, cookieName) {
  return req.cookies[`${cookieName}`] || req.cookies[` ${cookieName}`];
};

const retriveBehaviour = function(classObj, jsonObj) {
  return obj = new classObj(...Object.values(jsonObj));
};


const getTitle = function(req) {
  return req.body.title;
};

const getDescription = function(req) {
  return req.body.description;
};

const toJsonString = o => JSON.stringify(o, null, 2);

const fetchUser = function(usersData, userName) {
  return usersData.find(user => user.name == userName);
};

const getUser = function(usersData, userName) {
  let user = fetchUser(usersData, userName);
  return retriveBehaviour(User, user);
};

const updateData = function(usersData) {
  let data = toJsonString(usersData);
  fs.writeFileSync(usersRepoPath, data);
};

const createNewUser = function(usersData, userName) {
  let userId = new Counter(usersData.length);
  let newUser = new User(userName, userId.increment());
  usersData.push(newUser);
  updateData(usersData);
};

const ifNewUserCreateRepo = function(req, usersData) {
  let userName = getUserName(req);
  if (!fetchUser(usersData, userName))
    createNewUser(usersData, userName);
}

module.exports = {
  getUserName,
  getPassword,
  getContentType,
  setCookie,
  getAllTodo,
  redirectInvalidUser,
  getValidUser,
  hasAskedForToDo,
  getFileContents,
  fromJSON,
  getCookie,
  retriveBehaviour,
  getTitle,
  getDescription,
  toJsonString,
  getUser,
  updateData,
  ifNewUserCreateRepo
}
