const getUsersRepoPath = function () {
  return process.env.usersRepo || "./data/data.json";
};
const usersRepoPath = getUsersRepoPath();
const fs = require("fs");
const validUsers = require("../data/validUsers.js").validUsers;
const User = require("../models/user.js");
const Counter = require("../models/counter.js").Counter;


const getUserName = function (req) {
  return req.body.userName;
};

const getPassword = function (req) {
  return req.body.password;
};

const fromJSON = function(str) {
  return JSON.parse(str);
};

const getFileContents = function(url,fileSystem=fs) {
  let contents = fileSystem.readFileSync(url, "utf8");
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
    "gif": "image/gif",
    "txt": "text/plain"
  };
  return headers[fileExt];
};

const redirectInvalidUser = function(res) {
  res.setHeader("Set-Cookie", "message=login failed; Max-Age=5");
  res.redirect("login");
};

const setCookie = function(res, user) {
  let sessionid = new Date().getTime();
  user.sessionid = sessionid;
  res.setHeader("Set-Cookie", [`sessionid=${sessionid}`, `user=${user.userName}`]);
};

const getValidUser = function(req,validUsersList=validUsers) {
  let userName = getUserName(req);
  let password = getPassword(req);
  return validUsersList.find(validUser => {
    return validUser.userName == userName && validUser.password == password;
  });
};

const getCookie = function(req, cookieName) {
  return req.cookies[`${cookieName}`] || req.cookies[` ${cookieName}`];
};

const retriveBehaviour = function(classObj, jsonObj={}) {
  return obj = new classObj(...Object.values(jsonObj));
};


const getTitle = function(req) {
  return req.body.title;
};

const getDescription = function(req) {
  return req.body.description;
};

const getTodoId = function (req) {
  return req.body.todoId || getCookie(req,"todoId");
};

const getItemId = function (req) {
  return req.body.itemId;
};
const toJsonString = o => JSON.stringify(o, null, 2);

const fetchUser = function(usersData, userName) {
  return usersData.find(user => user.name == userName);
};

const getUserWithBehaviour = function(usersData, req) {
  let userName = getCookie(req, "user");
  let user = fetchUser(usersData, userName);
  return retriveBehaviour(User, user);
};

const updateData = function(usersData,path,fileSystem=fs) {
  let data = toJsonString(usersData);
  return fileSystem.writeFileSync(path, data);
};

const createNewUser = function(usersData, userName) {
  let userId = new Counter(usersData.length);
  let newUser = new User(userName, userId.increment());
  usersData.push(newUser);
  updateData(usersData,usersRepoPath);
};

const ifNewUserCreateRepo = function(req, usersData) {
  let userName = getUserName(req);
  if (!fetchUser(usersData, userName)) {
    createNewUser(usersData, userName);
  }
};

const getFilePath = function (req) {
  return `./public${req.url}`;
};

const replacePageContent = function (data,textToBeReplaced,text) {
  return data = data.replace(textToBeReplaced, text);
};

const urlIsOneOf = function(urls,url) {
  return urls.includes(url);
};

const fileExists = function (fs,url) {
  return fs.existsSync("./public" + url);
};

const generateId = function (initialCount) {
  let idCounter = new Counter(initialCount);
  return idCounter.increment();
};
module.exports = {
  getUserName,
  getPassword,
  getContentType,
  setCookie,
  redirectInvalidUser,
  getValidUser,
  getFileContents,
  fromJSON,
  getCookie,
  retriveBehaviour,
  getTitle,
  getDescription,
  getTodoId,
  toJsonString,
  getUserWithBehaviour,
  updateData,
  ifNewUserCreateRepo,
  fetchUser,
  createNewUser,
  getUsersRepoPath,
  getFilePath,
  replacePageContent,
  urlIsOneOf,
  fileExists,
  generateId,
  getItemId
};
