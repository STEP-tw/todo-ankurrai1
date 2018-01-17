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

let session = {};

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
  let content = fs.readFileSync('./data/data.json', 'utf8');
  let users = JSON.parse(content);
  let todos = users[userName]||{};
  return todos;
};

const getTitlesAsHtml = function(todos) {
  let titles = Object.keys(todos);
  let titlesAsHtml=titles.map((title)=>{
    return `<ul><a href='/getClickedToDo${title}'>${title}</a></ul>`
  });
  console.log(titlesAsHtml);
  return titlesAsHtml.join('<br>');
};

const getAllTodoInHtml = function(userName) {
  let todos = getAllTodo(userName);
  let titles = getTitlesAsHtml(todos);
  return titles;
};

const getHome = function(req, resp) {
  let data = fs.readFileSync('./public/index.html', 'utf8');
  resp.serve(data);
};

const serveLanding = function(req, resp) {
  let data = fs.readFileSync('./public/login', 'utf8');
  data = data.replace('loginFailedMessage', req.cookies.message || '');
  resp.setHeader('Content-Type', 'text/html');
  resp.serve(data);
}

const serveRegularFile = function(req, resp) {
  let filePath = req.url;
  fs.readFile(`./public${filePath}`, (error, data) => {
    if (error) return resp.respondWithError();
    resp.setHeader('Content-Type', getContentType(filePath))
    resp.serve(data);
  });
};

const serveHomePage = function(req, resp) {
  if (!req.cookies.sessionid){
    redirectInvalidUser(resp)
    return;
  }
  let data = fs.readFileSync(`./public/home`, 'utf8')
  let userName = req.cookies[' user'] || '';
  data = data.replace('user', userName);
  data = data.replace('placeHolder', getAllTodoInHtml(userName) || '');
  resp.serve(data);
};

const redirectInvalidUser = function(resp) {
  resp.setHeader('Set-Cookie', `message=login failed; Max-Age=5`);
  resp.redirect('login');
}

const getValidUser = function(req) {
  let userName = req.body.userName;
  let password = req.body.password;
  return validUsers.find(ValidUser => {
    return ValidUser.userName == userName && ValidUser.password == password;
  });
};

const setCookie = function(resp, user) {
  let sessionid = new Date().getTime();
  user.sessionid = sessionid;
  resp.setHeader('Set-Cookie', [`sessionid=${sessionid}`, `user=${user.userName}`]);
}

const handleLogin = function(req, resp) {
  let user = getValidUser(req);
  if (!user) {
    redirectInvalidUser(resp);
    return;
  }
  setCookie(resp, user);
  resp.redirect('home');
};

const logoutUser = function(req, resp) {
  resp.setHeader('Set-Cookie', [`sessionid=0; Max-Age=0`, `user=''; Max-Age=0`]);
  resp.redirect('login');
};

const handleNewTodo=function (req,resp) {
  let fileContent=fs.readFileSync('./public/newTodo','utf8');
  resp.serve(fileContent)
};

exports.handleNewTodo=handleNewTodo;
exports.serveHomePage = serveHomePage;
exports.logoutUser = logoutUser;
exports.serveLanding = serveLanding;
exports.handleLogin = handleLogin;
exports.getHome = getHome;
exports.serveRegularFile = serveRegularFile;
