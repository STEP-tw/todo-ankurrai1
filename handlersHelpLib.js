const fs = require('fs');
let validUsers = [{
    userName: 'ankurrai',
    password: 'ankur'
  },
  {
    userName: 'yogi',
    password: 'yogi'
  }
];

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
let content;

const getUsersTodos = function() {
  try {
    content = fs.readFileSync('./data/data.json', 'utf8');
  } catch (e) {
  console.error(e)
    return;
  }
  let data = JSON.parse(content);
  return data;
}

const getAllTodo = function(userName) {
  let users = getUsersTodos();
  let todos = users[userName] || {};
  return todos;
};

const storeTodos = function(userName, content) {
  let todos=getUsersTodos();
  todos[userName]=content;
  let data = JSON.stringify(todos, null, 1);
  fs.writeFile('./data/data.json', data, (err) => {
    if (err) console.log(`storage path ${filePath} not valid`);
  });
}

const validateUser = function(req, resp) {
  if (!req.cookies.sessionid)
    redirectInvalidUser(resp)
};

const redirectInvalidUser = function(resp) {
  resp.setHeader('Set-Cookie', `message=login failed; Max-Age=5`);
  resp.redirect('login');
};

const setCookie = function(resp, user) {
  let sessionid = new Date().getTime();
  user.sessionid = sessionid;
  resp.setHeader('Set-Cookie', [`sessionid=${sessionid}`, `user=${user.userName}`]);
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
  validateUser,
  redirectInvalidUser,
  getValidUser,
  hasAskedForToDo,

}
