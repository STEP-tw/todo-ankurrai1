const fs = require('fs');

const getContentType = require('./utils.js').getContentType;

let validUsers = [{
  userName: 'ankurrai',
  password: 'ankur'
}, {
  userName: 'yogi',
  password: 'yogi'
}];

let session = {};

const getHome = function(req, resp) {
  resp.redirect('index.html');
};

const serveLoginPage = function(req, resp) {
  let data = fs.readFileSync('./public/loginPage.html', 'utf8');
  console.log(req.cookies.message);
  data = data.replace('loginFailedMessage', req.cookies.message || '');
  resp.setHeader('Content-Type', 'text/html');
  resp.serve(data);
}

const serveRegularFile = function(req, resp) {
  let filePath = req.url;
  fs.readFile(`./public${filePath}`, (error, data) => {
    if (error) return resp.writeError();
    resp.setHeader('Content-Type', getContentType(filePath))
    resp.serve(data);
  });
};

const redirectInvalidUser = function(resp) {
  resp.setHeader('Set-Cookie', `message=login failed; Max-Age=5`);
  resp.redirect('loginPage.html');
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
  session = user;
  resp.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  console.log(session);
}

const handleLogin = function(req, resp) {
  let user = getValidUser(req);
  console.log(user);
  if (!user)
  return redirectInvalidUser(resp);
  setCookie(resp, user);
  resp.redirect('userHome.html');
};


exports.serveLoginPage = serveLoginPage
exports.handleLogin = handleLogin;
exports.getHome = getHome;
exports.serveRegularFile = serveRegularFile;
