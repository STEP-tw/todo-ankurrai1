const create= require('./frameWork/frameWork.js').create;

const logAndStoreRequest=require('./utils.js').logAndStoreRequest;

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
// app.preProcessUse(loadUser);


app.get("/",getHome);
app.get("/loginPage.html",serveLoginPage);
app.get("/logout",logoutUser);

app.post('/login',handleLogin);


app.postProcessUse(serveRegularFile);


module.exports=app;
