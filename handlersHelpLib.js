const fs = require('fs');
const validUsers = require('./data/validUsers.js').validUsers;
const fromJSON = function (str) {
  return JSON.parse(str);
};

const getFileContents = function (url) {
  let contents;
  try {
    contents = fs.readFileSync(url, 'utf8');
  } catch (e) {
  console.error(e)
    return;
  }
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
  let users = fromJSON(getFileContents('./data/data.json'));
  let user = users[userName];
  let todos =  user || [];
  debugger;
  return todos;
};

const storeTodos = function(userName, todoList) {
  let users= fromJSON(getFileContents('./data/data.json'));
  users[userName]=todoList;
  let data = JSON.stringify(users, null, 1);
  fs.writeFile('./data/data.json', data, (err) => {
    if (err) console.log(`storage path ${filePath} not valid`);
  });
}

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
  let userName = req.body.userName;
  let password = req.body.password;
  return validUsers.find(ValidUser => {
    return ValidUser.userName == userName && ValidUser.password == password;
  });
};

const hasAskedForToDo = (req) => {
  return req.method == 'GET' && req.url.startsWith('/todo_');
}

module.exports={
  getContentType,
  setCookie,
  getAllTodo,
  storeTodos,
  redirectInvalidUser,
  getValidUser,
  hasAskedForToDo,
  getFileContents
}
