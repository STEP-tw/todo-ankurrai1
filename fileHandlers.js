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
  let data = fs.readFileSync('./public/index.html', 'utf8');
  resp.serve(data);
};

const serveLoginPage = function(req, resp) {
  let data = fs.readFileSync('./public/loginPage.html', 'utf8');
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
}

const handleLogin = function(req, resp) {
  let user = getValidUser(req);
  if (!user)
  return redirectInvalidUser(resp);
  setCookie(resp, user);
  resp.redirect('userHome.html');
};

const logoutUser=function (req,resp) {
  resp.setHeader('Set-Cookie', `sessionid=0; Max-Age=0`);
  resp.redirect('loginPage.html');
};

exports.logoutUser=logoutUser
exports.serveLoginPage = serveLoginPage
exports.handleLogin = handleLogin;
exports.getHome = getHome;
exports.serveRegularFile = serveRegularFile;
