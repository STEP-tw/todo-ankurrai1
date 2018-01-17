const fs = require('fs');

const create= require('./webApp.js').create;

const loadUser=require('./fileHandlers.js').loadUser;
const getHome=require('./fileHandlers.js').getHome;
const serveLanding=require('./fileHandlers.js').serveLanding;
const handleNewTodo=require('./fileHandlers.js').handleNewTodo;
const serveRegularFile=require('./fileHandlers.js').serveRegularFile;
const loginGuestBook=require('./fileHandlers.js').loginGuestBook;
const handleLogin=require('./fileHandlers.js').handleLogin;
const logoutUser=require('./fileHandlers.js').logoutUser;
const serveHomePage=require('./fileHandlers.js').serveHomePage;
const storeCommentsAndRedirect=require('./fileHandlers.js').storeCommentsAndRedirect;
const redirectLoggedInUserToHome=require('./fileHandlers.js').redirectLoggedInUserToHome;

const timeStamp = () => {
  let today = new Date();
  return `${today.toDateString()} ${today.toLocaleTimeString()}`;
};

const toString=(o)=>JSON.stringify(o,null,2)
const logAndStoreRequest = (req, resp) => {
  console.log(`${req.method} ${req.url}`);
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toString(req.headers)}`,
    `COOKIES=> ${toString(req.cookies)}`,
    `BODY=> ${toString(req.body)}`, ''
  ].join('\n');
  fs.appendFile('./data/request.log', text, () => {});
};

const app = create();

app.preProcessUse(logAndStoreRequest);

app.get("/",serveLanding);
app.get("/login",serveLanding);
app.get("/home",serveHomePage);
app.get("/logout",logoutUser);
app.get('/newTodo',handleNewTodo)

app.post('/login',handleLogin);

app.postProcessUse(serveRegularFile);

module.exports=app;
