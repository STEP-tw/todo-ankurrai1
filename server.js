const http = require('http');
const port = 3000;

const logAndStoreRequest=require('./utils.js').logAndStoreRequest;

const create= require('./frameWork/frameWork.js').create;

const loadUser=require('./fileHandlers.js').loadUser;
const getHome=require('./fileHandlers.js').getHome;
const serveLoginPage=require('./fileHandlers.js').serveLoginPage;
const serveRegularFile=require('./fileHandlers.js').serveRegularFile;
const loginGuestBook=require('./fileHandlers.js').loginGuestBook;
const handleLogin=require('./fileHandlers.js').handleLogin;
const logoutUser=require('./fileHandlers.js').logoutUser;
const storeCommentsAndRedirect=require('./fileHandlers.js').storeCommentsAndRedirect;
const redirectLoggedInUserToHome=require('./fileHandlers.js').redirectLoggedInUserToHome;

const app = create();

app.preProcessUse(logAndStoreRequest);

app.get("/",getHome);
app.get("./loginPage.html",serveLoginPage);

app.post('/login',handleLogin);


app.postProcessUse(serveRegularFile);


const server = http.createServer(app);
server.listen(port);
server.on('error', (e) => console.error(`Server Error :::: ${e.message}`));
console.log(`Listening to Port ${port}`);

exports.app=app;
