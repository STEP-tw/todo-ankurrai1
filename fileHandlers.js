const fs = require('fs');
const  getContentType = require('./utils.js').getContentType;

let validUsers = [{
  userName: 'ankurrai',
  password: 'ankur'
}, {
  userName: 'yogi',
  password: 'yogi'
}];

let session={};

const getHome=function (req,resp) {
  resp.redirect('index.html');
};

const serveRegularFile = function(req, resp) {
  let filePath = req.url;
  fs.readFile(`./public${filePath}`, (error, data) => {
    if (error) return resp.writeError();
    resp.setHeader('Content-Type', getContentType(filePath))
    resp.serve(data);
  });
};

const redirectInvalidUser = function(resp) {
  resp.setHeader('Set-Cookie', 'logInFailed=true; Max-Age=5');
  resp.redirect('loginPage.html');
}

const showLoginFailed=function () {
  document.getElementById('hidden_mess').style.visibility = "visible"
};

const serveLoginPage=function (req,resp) {
  let filePath = req.url;
  console.log(resp.cookie);
  resp.setHeader('Content-Type', getContentType(filePath))
  fs.readFile('./public/login.html', (error, data) => {
    if (resp.cookie.includes("logInFailed=true")) {
      resp.serve(data);
      showLoginFailed();
    }
    resp.serve(data);

  });
}

const getValidUser = function(req) {
  let userName = req.body.userName;
  let password = req.body.password;
  return validUsers.find(ValidUser => {
    return ValidUser.userName == userName && ValidUser.password == password;
  });
};

const SetCookie = function(resp,user) {
  let sessionid = new Date().getTime();
  user.sessionid = sessionid;
  session=user;
  resp.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  console.log(session);
}

const handleLogin=function (req,resp) {
  console.log("hello");
  let user = getValidUser(req);
  if (!user) return redirectInvalidUser(resp);
  SetCookie(resp,user);
  resp.redirect('userHome.html')
};





exports.serveLoginPage=serveLoginPage
exports.handleLogin=handleLogin;
exports.getHome=getHome;
exports.serveRegularFile=serveRegularFile;
