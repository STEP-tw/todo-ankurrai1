const http = require('http');
const port = 3000;

const logAndStoreRequest=require('./utils.js').logAndStoreRequest;

const create= require('./frameWork/frameWork.js').create;

const loadUser=require('./fileHandlers.js').loadUser;
const getHome=require('./fileHandlers.js').getHome;
const serveRegularFile=require('./fileHandlers.js').serveRegularFile;
const loginGuestBook=require('./fileHandlers.js').loginGuestBook;
const loginUser=require('./fileHandlers.js').loginUser;
const logoutUser=require('./fileHandlers.js').logoutUser;
const storeCommentsAndRedirect=require('./fileHandlers.js').storeCommentsAndRedirect;
const redirectLoggedInUserToHome=require('./fileHandlers.js').redirectLoggedInUserToHome;

const app = create();

app.get("/",getHome);


app.postProcessUse(serveRegularFile);




const server = http.createServer(app);
server.listen(port);
server.on('error', (e) => console.error(`Server Error :::: ${e.message}`));
console.log(`Listening to Port ${port}`);
